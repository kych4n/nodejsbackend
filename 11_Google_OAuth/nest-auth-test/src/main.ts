import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());   // 전역 파이프에 validationPipe 객체 추가
  app.use(cookieParser());  // request 객체에서 cookie를 읽을 때 사용하는 미들웨어, 미들웨어란 모든 요청 또는 모든 응답에 대해 같은 작업을 하는 것
  app.use(
    session({
      secret: 'very-important-secret', // 세션 쿠키를 암호화하는데 사용
      resave: false, // 세션 쿠키를 매번 다시 저장할지 여부
      saveUninitialized: false, // 세션 저장 장소에 세션이 저장되기 전에 빈 값을 저장할 지 여부, false로 하는 것이 좋음
      cookie: {maxAge: 360000},
    }),
  )
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
