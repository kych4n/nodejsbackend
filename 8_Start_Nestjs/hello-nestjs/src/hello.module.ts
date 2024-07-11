import {Module} from "@nestjs/common";
import {HelloController} from "./hello.controller";

@Module({   // @Module은 모듈을 설정할 때 사용하는 데코레이터, 여기서는 컨트롤러만 설정하였음
    controllers: [HelloController], // 배열 내부에 있는 것들을 모두 모듈의 컨트롤러로 사용하겠다는 뜻
})
export class HelloModule {}