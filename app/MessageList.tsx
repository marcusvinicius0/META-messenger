"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";

import useSWR from "swr";
import fetcher from "@/utils/fetchMessages";
import { clientPusher } from "@/pusher";

import { Message } from "@/typings";

import MessageComponent from "./MessageComponent";

type Props = {
  initialMessages: Message[];
};

export default function MessageList({ initialMessages }: Props) {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/messages", fetcher);

  // useEffect(() => {
  //   const channel = clientPusher.subscribe("messages");

  //   channel.bind("new-messages", async (data: Message) => {
  //     if (messages?.find((message) => message.id === data.id)) return;

  //     if (!messages) {
  //       mutate(fetcher);
  //     } else {
  //       mutate(fetcher, {
  //         optimisticData: [data, ...messages],
  //         rollbackOnError: true,
  //       });
  //     }
  //   });

  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   };
  // }, [messages, clientPusher, mutate]);


  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    if (!channel) {
      return;
    } 
    console.log(channel);
  }, []);

  return (
    <div className="mt-5 space-y-5 lg:max-w-6xl lg:mx-auto mb-28">
      {messages?.length === 50 ? (
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
          {(messages || initialMessages)?.map((message) => (
            <MessageComponent key={message.id} message={message} />
          ))}
        </>
      )}
    </div>
  );
}
