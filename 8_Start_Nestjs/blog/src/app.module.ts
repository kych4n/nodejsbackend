import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogFileRepository, BlogMongoRepository } from './blog.repository';
import { Blog, BlogSchema} from "./blog.schema";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://hades1:yksh2020!!@cluster0.pvp0uzj.mongodb.net/blog"
    ),
    MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}]),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}
