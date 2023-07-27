import { Message } from "@/typings";
import Image from "next/image";

import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

type Props = {
  message: Message;
};

export default function MessageComponent({ message }: Props) {
  const isUser = true;

  return (
    <div className={`${isUser ? "px-5 flex space-x-4" : "px-5 flex justify-end space-x-4"}`}>
      <span className="flex-shrink-0">
        <Image
          className="rounded-full object-fill"
          height={10}
          width={50}
          src={message.profilePic}
          alt="Profile Picture"
        />
      </span>

      <div className="">
        <p className="text-blue-500 font-semibold">{message.username}</p>
        <p className="text-xs text-gray-400 font-semibold">
          {moment(message.created_at).format("DD/MM/YYYY")}
        </p>

        <div className="flex items-end space-x-1 pt-2">
          <div className={`${isUser ? "bg-blue-400 px-3 py-2 rounded-lg w-60 h-full max-h-64 overflow-y-scroll scrollbar scrollbar-" : "bg-red-400 px-3 py-2 rounded-lg w-60 h-full max-h-64 overflow-y-scroll scrollbar scrollbar-"}`}>
            <p className="text-white text-ellipsis break-words">
              {message.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
