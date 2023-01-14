import { Socket } from "socket.io";
import { conversationSocket } from "./conversationSocket";
import { onlineStatusSocket } from "./onlineStatusSocket";
import jwt, { JwtPayload } from "jsonwebtoken";
import { user } from "Controllers";

export enum SocketNames {
  connect = "connect",
  disconnect = "disconnect",
  conversation = "conversation",
  onlineStatus = "onlineStatus",
  onlineUsers = "onlineUsers",
}

const onlineUsers = {} as { [key: string]: string };

export const sockets = (socket: Socket) => {
  socket.on(SocketNames.conversation, conversationSocket);
  socket.on(SocketNames.onlineStatus, (data, callback) =>
    onlineStatusSocket(data, callback, socket, onlineUsers)
  );

  socket.on(SocketNames.disconnect, () => {
    delete onlineUsers[socket.id];
    // socket.disconnect();
  });
};
