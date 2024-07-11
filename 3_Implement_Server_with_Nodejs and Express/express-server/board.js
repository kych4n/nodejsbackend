const express = require("express"); // express 패키지 로딩
const app = express();  // express 객체 생성

app.use(express.json());    // app.use는 미들웨어를 사용할 때, 사용. 미들웨어란 모든 요청 또는 모든 응답에 대해 추가 기능을 적용하는 것. req.body를 사용할 수 있게 해주는 express.json 사용
app.use(express.urlencoded({extended:true}));   // urlencoded 타입이란 body에 키=값의 형태를 가진 데이터를 말함.

let posts = []; // 게시물을 저장할 배열

app.get("/", (req, res) => {
    res.json(posts);    // posts를 json 형태로 출력
});

app.post("/posts", (req, res)=>{
    const {title, name, text} = req.body;   // express.json 미들웨어가 쓰이는 부분. req.body를 title, name, body에 할당

    posts.push({id:posts.length+1, title, name, text});     // posts에 push
    res.json({title, name, text});
});

app.delete("/posts/:id", (req, res)=>{
    const id = req.params.id;
    const filteredPosts = posts.filter((post)=>post.id !== +id);    // req의 id와 다른 것은 모두 살려서 id와 같은 것을 삭제하는 효과.
    const isLengthChanged = filteredPosts.length !== posts; // 원소 개수 변화를 통해 변화 여부 확인
    if (isLengthChanged){   // 변화가 있으면, posts를 업데이트
        posts = filteredPosts;
        res.json(`IS CHANGED!`);
        return;
    }
    res.json(`NOT CHANGED.`);
})

app.listen(3000, ()=>{
    console.log("BOARD SERVER START!");
})