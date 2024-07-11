import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static')); // useStaticAssets()에 경로를 지정하면 정적 파일 서비스가 가능한데, 이 미들웨어가 익스프레스에 있기 때문에 NestExpressApplication으로 만들어주어야 함
  await app.listen(3000);
}
bootstrap();
