import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService){
        super({
            clientID: process.env.GOOGLE_CLIENT_ID, // 환경변수 파일에 공백이 없어야 함!!
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google",   // 인가가 성공하면 어디로 갈 것인가
            scope: ["email", "profile"],    // OAuth 인증 시 요청하는 데이터
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile){    
        const { id, name, emails } = profile;
        console.log(accessToken);
        console.log(refreshToken);

        const providerId = id;
        const email = emails[0].value;
        
        const user: User = await this.userService.findByEmailOrSave(email, name.familyName+name.givenName, providerId);

        return user;
    }
}