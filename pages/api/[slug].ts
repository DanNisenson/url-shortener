import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./apiHelpers/dbConnect";

type Data = {
  message: any;
};

const getUrl = async (shortId: string) => {
  try {
    const { urlsCollection, close } = await dbConnect();
    const { longUrl } = await urlsCollection.findOne({ shortUrl: shortId });
    // console.log("dbres", longUrl)
    close();
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
          res.status(200).json({message: dbRes})
          // res.redirect(301, dbRes)
        } else {
          res.status(400).json({ message: "no URL found"})
        }
  } else {
    res.status(400).json({ message: "wrong method"})
  }
}
