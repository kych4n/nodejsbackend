const express = require("express");
const url = require("url");
const app = express();
const port = 3000;

app.get("/", (req, res)=>res.end("Home"));
app.get("/user", user);
app.get("/feed", feed);

function user(req, res) {
    const userInfo = url.parse(req.url, true).query;
    res.end(`[user] name: ${userInfo.name}, age : ${userInfo.age}`);
};

function feed(req, res) {
    res.end(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>    
        </ul>`
    );
};

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end("404 page not found");
};

app.listen(port, ()=>{
    console.log(`Routing with Express`);
})