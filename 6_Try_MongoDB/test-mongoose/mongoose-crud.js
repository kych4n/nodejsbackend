// mongoose는 mongoDB를 다루는데 편리한 기능을 제공하는 라이브러리, 스키마 지정, 필드 타입 지정, 유효성 검증 등 가능
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person-model");   // Schema로 형식화된 collection이라고 생각하면 편함

mongoose.set("strictQuery", false); // 경고를 생성하게 하지 않기 위함

const app = express();
app.use(bodyParser.json());
app.listen(3000, async ()=>{
    console.log("Server started");
    const mongodbUri = "mongodb+srv://<id>:<password>@<clusterinfo>/test?retryWrites=true&w=majority&appName=Cluster0";

    mongoose
        .connect(mongodbUri, {useNewUrlParser: true})  // mongoDB에 연결, 오류를 발생시키지 않게 하기 위해 {useNewUrlParser: true} 있는 것이 좋음
        .then(console.log("Connected to mongoDB"));
});

app.get("/person", async (req, res)=>{
    const person = await Person.find({});   // 빈 객체인 {}로 넣으면 모든 데이터 반환하는데 문제가 발생할 수 있으므로 mongoose.set("strictQuery", false);
    res.send(person);
});

app.get("/person/:email", async (req, res) => {
    const person = await Person.findOne({email: req.params.email});
    res.send(person);
});

app.post("/person", async (req, res)=>{
    const person = await Person.create(req.body);
    // const person = new Person(req.body);
    // await person.save();
    res.send(person);
});

app.put("/person/:email", async (req, res) => {
    const person = await Person.findOneAndUpdate(
        {email: req.params.email},
        {$set: req.body},
        {new: true} // Person 모델에 업데이트 반영
    );
    console.log(person);
    res.send(person);
});

app.delete("/person/:email", async (req, res) => {
    await Person.deleteMany({email: req.params.email});
    res.send({success: true});
})
