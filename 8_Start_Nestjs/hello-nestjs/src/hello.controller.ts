import {Controller, Get} from "@nestjs/common";

@Controller()   // 클래스에 붙어서 컨트롤러로 사용할 수 있도록 해준다. 매개변수로 경로 지정 가능, 없으면 서버 주소
export class HelloController {  // 컨트롤러 클래스는 모듈에 포함되어야 하므로, export를 붙임
    @Get()  // Get 데코레이터 함수는 http 요청 중 GET 방식의 요청 처리
    hello() {
        return "hello!"
    }
}