import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm'    // 저장, 읽기 같은 기본적인 메서드를 제공하는 리포지토리

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,   // InjectRepository(User)로 User 타입의 리포지토리를 주입한다고 알려줌, User 테이블을 가지고 조작할 수 있게 됨
    ){}

    createUser(user) : Promise<User> {
        return this.userRepository.save(user);
    }

    async getUser(email: string) {
        const result = await this.userRepository.findOne({where: {email}});
        return result;
    }

    async updateUser(email, _user) {
        const user: User = await this.getUser(email);
        user.username = _user.username;
        user.password = _user.password;
        return this.userRepository.save(user);
    }

    deleteUser(email: any) {
        return this.userRepository.delete({email}); // {email} = {email:email}
    }

}
