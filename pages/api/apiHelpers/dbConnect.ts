const MongoClient = require("mongodb").MongoClient;

const url = process.env.DB_URL;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function connect() {
  await client.connect();
  const urlsCollection = client.db("url-shortener").collection("urls");
  const close = client.close();
  return { urlsCollection, close };
}

console.log("rats");
