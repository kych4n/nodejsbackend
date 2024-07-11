const express = require("express");
const handlebars = require("express-handlebars");
const mongodbConnection = require("./configs/mongodb-connection");
const postService = require("./services/post-service");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine("handlebars", handlebars.create({    // hanlebars.create를 통해 handlebars 객체를 생성할 수 있고, 옵션을 설정할 수 있음
    helpers: require("./configs/handlebars-helpers"),
}).engine
);  // 익스프레스에서 사용할 템플릿 엔진을 설정, 파일의 확장자를 handlebars로 설정. handlebars.engine()을 handlebars라고 사용할 것임

app.set("view engine", "handlebars");   // 웹 페이지에서 사용할 템플릿 엔진 설정
app.set("views", __dirname+"/views");   // view를 위한 디렉토리를 views로 설정, __dirname은 node를 실행하는 디렉터리 경로

let collection; 

app.get("/", async (req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    try{
        const [posts, paginator] = await postService.list(collection, page, search);
        res.render("home", {title : "Test Board", search, paginator, posts});
    } catch (error) {
        console.error(error);
        res.render("home", {title: "Test Board"});  // /views/home.handlebars이라는 템플릿 파일에 객체 변경 요소를 렌더링(업데이트)하고, 응답으로 제공
    }
});

app.get("/write", (req, res)=>{
    res.render("write", {title: "Test Board", mode: "create"});
});

app.post("/write", async (req, res)=>{
    const post = req.body;
    const result = await postService.writePost(collection, post);
    res.redirect(`/detail/${result.insertedId}`);
});

app.get("/detail/:id", async (req, res)=>{
    const result = await postService.getDetailPost(collection, req.params.id);
    res.render("detail", {
        title: "Test Board",
        post: result.value,
    });
});

app.post("/check-password", async (req, res) =>{
    const { id, password } = req.body;
    const post = await postService.getPostByIdAndPassword(collection, {id, password});

    if (!post) {
        return res.status(404).json({isExist: false});
    } else{
        return res.json({isExist: true});
    }
});

app.get("/modify/:id", async (req, res) => {
    const post = await postService.getPostById(collection, req.params.id);
    console.log(post);
    res.render("write", {title: "Test Board", mode: "modify", post});
});

app.post("/modify/", async (req, res) => {  
    const {id, title, writer, password, content} = req.body;

    const post = {
        title,
        writer,
        password,
        content,
        createdDt: new Date().toISOString(),
    };

    const result = postService.updatePost(collection, id, post);
    res.redirect(`/detail/${id}`);
})

app.delete("/delete", async (req, res)=>{
    const {id, password} = req.body;
    try{
        const result = await collection.deleteOne({_id: ObjectId(id), password:password});
        if (result.deletedCount !== 1) {
            console.log("Fail to delete");
            return res.json({isSuccess: false});
        }
        return res.json({isSuccess:true});
    } catch (error) {
        console.error(error);
        return res.json({isSuccess: false});
    }
});

app.post("/write-comment", async (req, res)=>{
    const {id, writer, password, comment} = req.body;
    const post = await postService.getPostById(collection, id);

    if (post.comments){ // 있으면 배열에 추가
        post.comments.push({
            idx: post.comments.length + 1,
            writer,
            password,
            comment,
            createdDt: new Date().toISOString(),
        });
    } else{
        post.comments = [   // 없으면 배열을 만듦
            {   idx: 1,
                writer,
                password,
                comment,
                createdDt: new Date().toISOString()
            }
        ]
    }

    postService.updatePost(collection, id, post);
    return res.redirect(`/detail/${id}`);
});

app.delete("/delete-comment", async (req, res)=>{
    const {id, idx, password} = req.body;
    const post = await collection.findOne({
        _id : ObjectId(id),
        comments: { $elemMatch: {idx: parseInt(idx), password }},   // $elemMatch란 document 내부의 리스트 내부의 원소로 도큐먼트를 찾음
    }, postService.projectionOption);

    if (!post){
        return res.json({isSuccss : false});
    }

    post.comments = post.comments.filter((comment)=>comment.idx !== idx);
    postService.updatePost(collection, id, post);
    return res.json({isSuccess : true});
});

app.listen(3000, async()=>{
    console.log("Server started");
    const mongoClient = await mongodbConnection(); 
    collection = mongoClient.db().collection("post");   // collection post 생성 후 할당
    console.log("MongoDB Connected")
});

