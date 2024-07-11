import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('/user')
export class UserController {
    constructor(private userService: UserService){} // UserService를 타입으로 가지면, UserService가 Injectable이므로 자동으로 주입됨

    @Post('/create')
    createUser(@Body() user: CreateUserDto){
        return this.userService.createUser(user);
    }

    @Get('/getUser/:email')
    async getUser(@Param('email') email: string){
        return await this.userService.getUser(email);
    }

    @Put('/update/:email')
    updateUser(@Param('email') email: string, @Body() user: UpdateUserDto){
        return this.userService.updateUser(email, user);
    }

    @Delete('/delete/:email')
    deleteUser(@Param('email') email: string){
        return this.userService.deleteUser(email);
    }

}
