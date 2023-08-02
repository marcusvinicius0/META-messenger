import { Message } from "@/typings";
import Image from "next/image";

import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

import { ShieldExclamationIcon } from "@heroicons/react/24/solid";

type Props = {
  message: Message;
};

export default function MessageComponent({ message }: Props) {
  const isUser = true;

  return (
    <div className={`flex w-fit p-2 ${isUser && "ml-auto"}`}>
      <span className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          className="rounded-full object-fill"
          height={10}
          width={50}
          src={message.profilePic}
          alt="Profile Picture"
        />
      </span>

      <div className={`${isUser ? "pr-2" : "pl-2"}`}>
        <p
          className={`font-semibold ${
            isUser ? "text-blue-500 text-right" : "text-red-500 text-left"
          }`}
        >
          {message.username}
        </p>
        <span
          className={`flex items-center space-x-8 ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          {isUser ? (
            <>
              <ShieldExclamationIcon
                className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-500/80 transition-none ease-in-out"
                title="Denunciar comentário"
              />
              <p className="text-xs text-gray-600 font-semibold text-right">
                {moment(message.created_at).format("DD/MM/YYYY")}
              </p>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-600 font-semibold text-left">
                {moment(message.created_at).format("DD/MM/YYYY")}
              </p>
              <ShieldExclamationIcon
                className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-500/80 transition-none ease-in-out"
                title="Denunciar comentário"
              />
            </>
          )}
        </span>

        <div
          className={`flex items-end space-x-1 pt-2 relative ${
            isUser ? "left-10 top-4" : "right-12 top-4"
          }`}
        >
          <div
            className={`px-3 py-2 w-full max-w-60 h-full max-h-64 overflow-y-scroll scrollbar ${
              isUser
                ? "bg-blue-400 ml-auto order-2 rounded-md"
                : "bg-red-400 rounded-l-md rounded-r-lg"
            }`}
          >
            <p className="text-white text-ellipsis break-words">
              {message.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
