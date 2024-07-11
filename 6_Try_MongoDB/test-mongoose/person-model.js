var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const personSchema = new Schema({
    name: String,
    age: Number,
    email: {type: String, required: true},
});

module.exports = mongoose.model('Person', personSchema);    
// mongoose는 첫 번째 매개변수에는 사용하려고 하는 collection을 단수로 쓴다. 자동으로 소문자+복수형으로 변환하기 때문에 mongodb에는 people collection이 생성된다
// model은 collection의 document들에 Schema를 적용시킴으로써 mongoDB와 상호작용할 수 있게 함