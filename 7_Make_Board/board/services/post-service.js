const paginator = require("../utils/paginator");
const { ObjectId } = require("mongodb");

async function writePost(collection, post){
    post.hits = 0;
    post.createdDt = new Date().toISOString();
    return await collection.insertOne(post);    // insertOnde을 한 후, return 문서에 insertedId가 있음
}

const projectionOption = {  // 패스워드와 댓글들의 패스워드를 가져오지 않음
    projection: {
        password: 0,    
        "comments.password":0,
    }
}

async function list(collection, page, search){
    const perPage = 10; // 노출할 게시물 수
    const query = {title: new RegExp(search, "i")}; // 대소문자를 구분하지 않고, 전달받은 search와 title을 비교
    const cursor = collection.find(query, {limit: perPage, skip: (page-1)*perPage}).sort({createdDt: -1, });    // limit 최대 몇 개를 가져오는가, skip document를 가져오기 전에 몇개를 건너뛰는가, sort createdDt를 기준으로 역순

    const totalCount = await collection.count(query);   // collection에서 query에 맞는 document 수
    const posts = await cursor.toArray();
    const paginatorObj = paginator({totalCount, page, perPage: perPage});
    return [posts, paginatorObj];
}

async function getDetailPost(collection, id){
    return await collection.findOneAndUpdate({_id: ObjectId(id)}, {$inc: {hits: 1}}, projectionOption);   // 전달받은 id를 통해 게시물을 찾고, 조회수를 1 증가
};

async function getPostByIdAndPassword(collection, {id, password}){
    return await collection.findOne({_id: ObjectId(id), password: password}, projectionOption);
}

async function getPostById(collection, id){
    return await collection.findOne({_id: ObjectId(id)}, projectionOption);
}

async function updatePost(collection, id, post){
    const toUpdatePost = {
        $set: {
            ...post, 
        },
    };
    return await collection.updateOne({_id: ObjectId(id)}, toUpdatePost);
}

module.exports = {
    list,
    writePost,
    getDetailPost,
    getPostByIdAndPassword,
    getPostById,
    updatePost,
}