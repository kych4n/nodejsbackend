
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<id>:<password>@<clusterinfo>/test?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  await client.connect();
  const adminDB = client.db('test').admin() // test라는 이름을 가진 데이터베이스의 admin collection에 접근하도록 함
  const listDatabases = await adminDB.listDatabases();  // 이용가능한 데이터베이스의 정보를 가져옴
  console.log(listDatabases);
  return "OK";
}

run().
  then(console.log).
  catch(console.error).
  finally(()=>client.close());
