import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LoginGuard implements CanActivate {    // CanActivate는 인터페이스
    constructor(private authService: AuthService){};

    async canActivate(context): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (request.cookies['login']){
            return true;
        }

        if (!request.body.email || !request.body.password) {
            return false;
        }


        const user = await this.authService.validateUser(request.body.email, request.body.password);
        if (!user){
            return false;
        }
        request.user = user;
        return true;
    }
}

@Injectable()
export class LoginAuthGuard extends AuthGuard("local") {    
    async canActivate(context): Promise<boolean> {
        const result = (await super.canActivate(context)) as boolean;   // 로컬 스트래티지 실행, as boolean은 boolean으로 취급하겠다는 뜻
        const request = context.switchToHttp().getRequest();
        if (result){
            await super.logIn(request); // request를 가지고 로그인 처리를 하고, 세션을 저장함.
        }
        return result;
    }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated();   // Request의 세션 쿠키에 있는 정보를 읽어서 인증 확인
    }
}

// 가드는 컨트롤러의 경로로 보내기 전에 검증하는 역할을 하는 것임. LoginAuthGuard는 id, pw를 이용하여 검증 과정을 거쳐야 하기 때문에 AuthGuard를 extends하지만,
// AuthenticatedGuard는 request에 있는 세션만 이용하면 되기 때문에 CanActivate를 구현함.