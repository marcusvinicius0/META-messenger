"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";

import useSWR from "swr";
import fetcher from "@/utils/fetchMessages";
import { clientPusher } from "@/pusher";
import { Message } from "@/typings";

import MessageComponent from "./MessageComponent";

type Props = {};

export default function MessageList({}: Props) {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/messages", fetcher);

  useEffect(() => {
    async function getMessages() {
      const channel = clientPusher.subscribe("messages");
      channel.bind("new-messages", async (data: Message) => {
        if (!messages) {
          mutate(fetcher);
        } else {
          mutate(fetcher, {
            optimisticData: [data, ...messages],
            rollbackOnError: true,
          });
        }
      });
    }
    getMessages()
  }, [messages, mutate, clientPusher]);

  return (
    <div className="mt-5 space-y-5">
      {messages?.length === 5 ? (
        <>
          {messages?.map((message) => (
            <>
              <MessageComponent key={message.id} message={message} />
            </>
          ))}
          <div className="">
            <p className="semi-bold text-gray-900 cursor-pointer hover:opacity-75 transition-all ease-in-out">
              Ver mais...
            </p>
          </div>
        </>
      ) : (
        <>
          {messages?.map((message) => (
            <MessageComponent key={message.id} message={message} />
          ))}
        </>
      )}
    </div>
  );
}
