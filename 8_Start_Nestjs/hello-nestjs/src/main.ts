import { NestFactory } from "@nestjs/core";
import { HelloModule } from "./hello.module";

async function bootstrap(){
    const app = await NestFactory.create(HelloModule);  // NestApplication 객체 생성, NestApplication 객체에는 HTTP 부분을 모듈화한 HTTPAdapter가 있는데, 여기서 express 사용

    await app.listen(3000, ()=>{console.log("Server Start");});
}

bootstrap();    // NestJS에서는 진입점(=최초로 실행되는 함수)의 이름을 bootstrap으로 이름 짓는 것이 관례