// CRUD = Create, Read, Update, Delete
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<id>:<password>@<clusterinfo>/test?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  useNewUrlParser: true
});

async function run() {
  try {
    await client.connect();
    console.log("Success Connect");
    
    const collection = client.db('test').collection('person');  // test라는 데이터베이스 안의 person이라는 collection을 가져옴, 즉 하나의 데이터베이스 안에는 여러 개의 collection 존재 가능

    await collection.insertOne({name:"Tom", age:40});
    console.log("Success Insert");

    await collection.insertOne({name:"Tom", age:30});
    console.log("Success Insert");

    const documents = await collection.find({name:"Tom"}).toArray();
    console.log("Found documents:", documents);

    await collection.updateOne({name:"Tom"}, {$set: {age: 31}});
    console.log("Updated document");

    const updatedDocuments = await collection.find({name:"Tom"}).toArray();
    console.log("Updated documents:", updatedDocuments);

    // await collection.deleteOne({name: "Tom"});
    // console.log("Deleted document");

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.error);
