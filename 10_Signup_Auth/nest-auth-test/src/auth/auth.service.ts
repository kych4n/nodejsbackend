import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async register(userDto: CreateUserDto){
        const user = await this.userService.getUser(userDto.email);
        if (user) {
            throw new HttpException("already existed", HttpStatus.BAD_REQUEST);
        }

        const encryptedPassword = bcrypt.hashSync(userDto.password, 10);    // password 암호화를 10번 하겠다는 의미

        try{
            const new_user = await this.userService.createUser({...userDto, password: encryptedPassword});  // 나열하고 password만 바꿈
            new_user.password = undefined;  // 반환할 때는
            return new_user;
        } catch (error) {
            throw new HttpException("Server Error", 500);
        }
    }

    async validateUser(email: string, password: string){
        const user = await this.userService.getUser(email);

        if (!user) {
            return null;
        }
        const {password: hashedPassword, ...userInfo} =  user;
        if (bcrypt.compareSync(password, hashedPassword)){
            return userInfo;
        }
        return null;
    }
}
