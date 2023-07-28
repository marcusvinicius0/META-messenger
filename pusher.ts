import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1641566",
  key: "faf604413429cebe8d44",
  secret: process.env.SERVER_PUSHER_SECRET!,
  cluster: "us2",
  useTLS: true,
});

export const clientPusher = new ClientPusher("c2007545defccbbecfaa", {
  cluster: "us2",
  forceTLS: true,
});
