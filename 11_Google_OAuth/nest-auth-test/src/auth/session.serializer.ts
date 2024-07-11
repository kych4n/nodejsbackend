import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

@Injectable()
export class SessionSerializer extends PassportSerializer { // PassportSerializer는 serailizeUser(세션에 정보 저장), desiralizeUser(세션으로부터 정보를 가져옴), getPassportInstance를 제공
    constructor(private userService: UserService){
        super();    // PassportSerializer의 모든 메소드를 가져옴. 
    }

    serializeUser(user: any, done: (err: Error, user: any)=>void): any{ // LocalAuthGuard에서 super.logIn(request)를 하면, request.user를 꺼내서 serializeUser에 전달하면서 실행
        done(null, user.email); // 세션에 저장할 정보가 email
    }

    async deserializeUser(payload: any, done: (err: Error, payload: any)=>void): Promise<any>{
        const user = await this.userService.getUser(payload);

        if (!user){
            done(new Error('No User'), null);
            return;
        }
        const {password, ...userInfo} = user;

        done(null, userInfo);   // 세션으로부터 가져올 정보가 done, console.log(payload)로 세션 값 확인 가능
    }
}