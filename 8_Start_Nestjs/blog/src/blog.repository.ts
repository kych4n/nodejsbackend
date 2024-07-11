import {Injectable} from "@nestjs/common";
import {readFile, writeFile} from "fs/promises";    // 파일을 읽고 쓰는 모듈 import
import {PostDto} from "./blog.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Blog, BlogDocument} from "./blog.schema";

export interface BlogRepository {
    getAllPost(): Promise<PostDto[]>;
    createPost(postDto: PostDto);
    getPost(id: String): Promise<PostDto>;
    deletePost(id: String);
    updatePost(id: String, postDto: PostDto);
}

@Injectable()   
export class BlogFileRepository implements BlogRepository {
    FILE_NAME = "./src/blog.data.json";

    async getAllPost(): Promise<PostDto[]>{
        const datas = await readFile(this.FILE_NAME, "utf-8");
        const posts = JSON.parse(datas);
        return posts;
    }

    async createPost(postDto: PostDto){   // postDto라는 변수가 PostDto 타입임
        const posts = await this.getAllPost();
        const id = posts.length + 1;
        const createPost = {id: id.toString(), ...postDto, createdDt: new Date()};
        posts.push(createPost);
        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }

    async getPost(id: string): Promise<PostDto> {
        const posts = await this.getAllPost();
        const post = posts.find((post) => {
            return post.id === id;
        });
        return post;
    }

    async deletePost(id: string){
        const posts = await this.getAllPost();
        const filteredPosts = posts.filter((post)=>post.id !== id);
        await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
    }

    async updatePost(id: string, postDto: PostDto){
        const posts = await this.getAllPost();
        const index = posts.findIndex((post) => post.id === id);
        const updatePost = {id, ...postDto, updatedDt: new Date()};
        posts[index] = updatePost;
        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }
}

@Injectable()
export class BlogMongoRepository implements BlogRepository {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>){}; 

    async getAllPost(): Promise<Blog[]> {
        return await this.blogModel.find();
    }

    async createPost(postDto: PostDto) {
        const createdPost = {
            ...postDto,
            createdDt: new Date(),
            updatedDt: new Date(),
        };
        this.blogModel.create(createdPost);
    }

    async getPost(id: string) : Promise<PostDto> {
        return await this.blogModel.findById(id);
    }

    async deletePost(id: String) {
        await this.blogModel.findByIdAndDelete(id);
    }

    async updatePost(id: String, postDto: PostDto) {
        const updatedPost = {id, ...postDto, updatedDt: new Date()};
        await this.blogModel.findByIdAndUpdate(id, updatedPost);
    }
}