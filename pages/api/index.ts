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
      res.redirect(
        301,
        "https://refactoring.com/"
      );
      break;
    case "POST":
      // new entry in db
      res.status(201).json({ message: "cool beans" });
      break;
    default:
      res.status(400).json({ message: "Wrong method!" });
  }
}
