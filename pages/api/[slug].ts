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

const getUrl = async (shortId: string) => {
  try {
    await client.connect();
    const urlsCollection = client.db("url-shortener").collection("urls");
    const { longUrl } = await urlsCollection.findOne({ shortUrl: shortId });
    console.log("dbres", longUrl)
    return longUrl;
  } catch (error) {
    console.log("getUrl error", error);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const { slug } = req.query;
        if (slug) {
          const dbRes = await getUrl(slug as string);
          res.redirect(301, dbRes)
        } else {
          res.status(400).json({ message: "no URL found"})
        }
  } else {
    res.status(400).json({ message: "wrong method"})
  }
}
