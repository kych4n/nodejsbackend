const http = require("http");
const url = require("url");

http.createServer((req, res)=>{
    const path = url.parse(req.url, true).pathname; // req의 url을 파싱해서 pathname을 가져옴. true로 설정하면, query도 같이 파싱한다는 뜻
    res.setHeader("Content-Type", "text/html");
    
    if (path === "/user"){
        user(req, res);       
    } else if (path === "/feed"){
        feed(req, res);
    } else {
        notFound(req, res);
    }
}).listen(3000, ()=>console.log("ROUTER START"));

const user = (req, res) => {
    res.end("[user] name : hades, age : 26");
}

const feed = (req, res) => {
    res.end(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>    
        </ul>`
    );
}

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end("404 page not found");
}