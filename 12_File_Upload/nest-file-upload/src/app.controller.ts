import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from './multer.options';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello(){
    return this.appService.getHello();
  }

  // @Post('/file-upload')
  // @UseInterceptors(FileInterceptor('file', multerOption)) // 파일명이 file 인 파일이 있는지 확인하고 함수의 매개변수로 전달
  // fileUpload(@UploadedFile() file: Express.Multer.File){  // @UploadedFile은 전달받은 파일 객체를 꺼내서 file에 저장
  //   console.log(file);
  //   return "File Uploaded";
  // }

  @Post('file-upload')
  @UseInterceptors(FileInterceptor('file', multerOption))
  fileUpload(@UploadedFile() file: Express.Multer.File){
    console.log(file);
    return `${file.originalname} is uploaded at http://localhost:3000/uploads/${file.filename}`;
  }
}
