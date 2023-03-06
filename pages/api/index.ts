const MongoClient = require("mongodb").MongoClient;
import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: any;
};

const url = process.env.DB_URL;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const insertUrl = async (longUrl: string) => {
  const shortId = nanoid();
  console.log("insert function");
  try {
    await client.connect();
    const urlsCollection = client.db("url-shortener").collection("urls");
    const newEntry = {
      longUrl: longUrl,
      shortUrl: shortId,
    };
    const insertResponse = await urlsCollection.insertOne(newEntry);
    console.log("insertresponse", insertResponse);
    client.close();
    return shortId;
  } catch (error) {
    console.log("insert error", error);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const dbRes = await insertUrl(req.body.url);
      console.log("contr", dbRes);
      res.status(201).json({ message: `http://localhost:3000/api/${dbRes}` });
    } catch (error) {
      console.log("error", error);
    }
  } else {
    res.status(400).json({ message: "Wrong method!" });
  }
}
