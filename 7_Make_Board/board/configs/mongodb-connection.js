const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://<id>:<password>@<clusterinfo>/test?retryWrites=true&w=majority&appName=Cluster0";

module.exports = function (callback) {
    return MongoClient.connect(uri, callback);  // module.exports는 require했을 때, 노출할 객체를 저장하는 변수, mongoClient 객체와 uri와 연결, callback이 있으면 callback 실행
}