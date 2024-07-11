import {Injectable} from "@nestjs/common";
import { PostDto } from "./blog.model"; // dto = data transfer object, 데이터를 나타내는 필드들이 있고, 함수가 있는 경우에는 필드의 값을 가져오거나 설정하는 함수만 있음
import { BlogFileRepository, BlogRepository, BlogMongoRepository } from "./blog.repository";

@Injectable()
export class BlogService {
    private blogRepository: BlogMongoRepository;
    constructor(blogRepository: BlogMongoRepository){   // BlogMongoRepository가 주입됨
        this.blogRepository = blogRepository;
    }

    async getAllPost(){
        return await this.blogRepository.getAllPost();
    }

    createPost(postDto: PostDto){   // postDto라는 변수가 PostDto 타입임
        this.blogRepository.createPost(postDto);
    }

    async getPost(id): Promise<PostDto> {
        return await this.blogRepository.getPost(id);
    }

    deletePost(id){
        this.blogRepository.deletePost(id);
    }

    updatePost(id, postDto: PostDto){
        this.blogRepository.updatePost(id, postDto);
    }
}