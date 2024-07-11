import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
import { LoginGuard, LoginAuthGuard, AuthenticatedGuard, GoogleAuthGuard } from './auth.guard';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {};

    @Post('/register')
    async register(@Body() userDto: CreateUserDto){
        return await this.authService.register(userDto);
    }

    @Post('/login')
    async login(@Request() req, @Response() res){
        const userInfo = await this.authService.validateUser(req.body.email, req.body.password);

        if (userInfo){
            res.cookie('login', JSON.stringify(userInfo), {
                httpOnly: false,    // true이면 브라우저에서 쿠키를 읽을 수 없음
                maxAge: 1000*60*60*24*7     // lifetime 밀리초 단위
            });
        }
        return res.send({message: "login success"});
    }

    @UseGuards(LoginGuard)  // 가드를 통과하면 아래가 실행됨
    @Post('/login2')
    async login2(@Request() req, @Response() res){
        if (!req.cookies['login'] && req.user){
            res.cookie('login', JSON.stringify(req.user), {
                httpOnly: true,
                maxAge: 1000*10,
            });
        }
        return res.send({ message: "login2 success" });
    }

    @UseGuards(LoginGuard)
    @Get('/test-guard')
    testGuard(){
        return "passed guard"
    }

    @UseGuards(LoginAuthGuard)
    @Post('/login3')
    login3(@Request() req){
        return req.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/test-guard2')
    testGuardWithSession(@Request() req){
        return req.user;
    }

    @Get('/to-google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Request() req) {

    }

    @Get('/google')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Request() req, @Response() res) {
        const { user } = req;
        return res.send(user);
    }
}
