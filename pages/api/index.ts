import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      res.status(200).json({ message: "some.url/12345" });
      break;
    case "POST":
      res.status(201).json({ message: "some.url/12345" });
      break;
    default:
      res.status(400).json({ message: "Wrong method!" })
  }
}
