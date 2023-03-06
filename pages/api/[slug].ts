import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
const MongoClient = require("mongodb").MongoClient;

type Data = {
  message: any;
};

const url = process.env.DB_URL;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const insertUrl = async (longUrl: string) => {
  // client.connect((err: any) => {
    //   const collection = client.db("url-shortener").collection("urls");
    
    //   console.log(err);
    //   // perform actions on the collection object
    //   client.close();
    // });
    const shortId = nanoid();

    try {
    await client.connect();
    const urlsCollection = client.db("url-shortener").collection("urls");
    const newEntry = {
      longUrl: longUrl,
      shortUrl: shortId,
    };
    const insertResponse = await urlsCollection.insertOne(newEntry);
    console.log("insertresponse", insertResponse);
    return shortId;
    // const findOne = await urlsCollection.findOne({ shortUrl: "shorty" });
    // console.log("lol",findOne);
    client.close()
  } catch (error) {
    console.log(error);
  }
};

const getUrl = async (shortId: string) => {
  console.log("slug", shortId)
  try {
    await client.connect();
    const urlsCollection = client.db("url-shortener").collection("urls");
    const dbRes = urlsCollection.findOne({ shortUrl: shortId})
    console.log(dbRes);
    return dbRes
  } catch (error) {
    
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      // res.redirect(
      //   301,
      //   "https://refactoring.com/"
      // );
      const shortId = req.query.slug;
      getUrl(shortId);
      const resp = "lolol";
      res.status(200).json({ message: resp });
      break;
    case "POST":
      // new entry in db
      res.status(201).json({ message: "cool beans" });
      break;
    default:
      res.status(400).json({ message: "Wrong method!" });
  }
}
