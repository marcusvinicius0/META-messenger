import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

type Props = {};

export default function HomePage({}: Props) {
  return (
    <main>
      <MessageList />
      <ChatInput />
    </main>
  );
}
