const http = require("http");
const url = require("url");

http.createServer((req, res)=>{
    const path = url.parse(req.url, true).pathname; // req의 url을 파싱해서 pathname을 가져옴. true로 설정하면, query도 같이 파싱한다는 뜻
    res.setHeader("Content-Type", "text/html");
    
    if (path === "/user"){
        res.end("[user] name : hades, age : 26");
    } else if (path === "/feed"){
        res.end(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>    
        </ul>
    `);
    } else {
        res.statusCode = 404;
        res.end("404 page not found");
    }
}).listen(3000, ()=>console.log("라우터를 만들어보았음"));