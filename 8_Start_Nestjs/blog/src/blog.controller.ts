import {Controller, Get, Post, Delete, Put, Body, Param} from "@nestjs/common"  // Body, Param은 매개변수에 붙이는 데코레이터, req.body, req.param을 매개변수에 할당
import {BlogService} from "./blog.service";

@Controller("/blog")
export class BlogController {
    constructor(private blogService: BlogService){}

    @Get()
    async getAllPosts(){
        console.log("Get all posts");
        return await this.blogService.getAllPost();
    }

    @Post()
    createPost(@Body() postDto){
        console.log("Create post");
        this.blogService.createPost(postDto);
        return "success create";
    }

    @Get("/:id")
    async getPost(@Param("id") id: string) {
        console.log("Get a post");
        return await this.blogService.getPost(id);
    }

    @Delete("/:id")
    deletPost(@Param("id") id: string) {
        console.log("Delete a post");
        this.blogService.deletePost(id);
        return "success delete"
    }

    @Put("/:id")
    updatePost(@Param("id") id: string, @Body() postDto){
        console.log("Update post", id, postDto);
        return this.blogService.updatePost(id, postDto);
    }
}