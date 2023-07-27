// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { Message } from "@/typings";

type Data = {
  type: "data";
  messages: Message[];
};

type ErrorData = {
  type: "error";
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "GET") {
    res.status(405).json({ type: "error", body: "Method Not Allowed" });
    return;
  }

  const messageRes = await redis.hvals("messages");
  const messages: Message[] = messageRes.map((message) => JSON.parse(message));

  const sortedMessages = messages.sort((a, b) => {
    const aCreatedAt = new Date(a.created_at).getTime();
    const bCreatedAt = new Date(b.created_at).getTime();

    return bCreatedAt - aCreatedAt;
  });

  const limitMessagesToFifth = sortedMessages.slice(0, 50);

  const data: Data = { type: "data", messages: limitMessagesToFifth };

  console.log("mano", data);

  res.status(200).json(data);
}
