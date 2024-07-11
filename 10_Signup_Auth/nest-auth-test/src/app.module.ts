import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ // forRoot는 설정
      type: 'sqlite', // 데이터베이스 타입
      database: 'nest-auth-test.sqlite',  // 데이터베이스 파일명
      entities: [User], 
      synchronize: true,  // true 설정로 하면 서버 기동 시 서버가 엔티티 객체를 읽어서 데이터베이스 스키마를 만들거나 변경, 개발용으로만 사용
      logging: true,  // sql 실행 로그 확인 가능, 개발 시 유용
    }),
    UserModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
