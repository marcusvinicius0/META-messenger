import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { Message } from "@/typings";

type Props = {};

export default async function HomePage({}: Props) {
  const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`).then((res) => res.json());

  const messages: Message[] = data.messages;

  return (
    <main>
      <MessageList initialMessages={messages} />
      <ChatInput />
    </main>
  );
}
