import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    serveRoot: '/uploads',  // 파일에 접근할 때는 localhost:3000/uploads/{파일명}
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
