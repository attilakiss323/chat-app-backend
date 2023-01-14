import { Socket } from "socket.io";
import { db } from "../Models";
import { SocketNames } from "./index";

const User = db.user;

export const onlineStatusSocket = async (
  { email }: { email: string },
  callback: (args: any) => void,
  socket: Socket,
  onlineUsers: { [key: string]: string }
) => {
  if (email) {
    const user = await User.findOne({
      where: { email },
    });

    if (user) {
      if (!Object.keys(onlineUsers).find((key) => onlineUsers[key] === email)) {
        Object.assign(onlineUsers, { [socket.id]: user.email });
      }

      callback({ success: true });

      socket.emit(SocketNames.onlineUsers, {
        onlineUsers: Object.values(onlineUsers),
      });
      socket.broadcast.emit(SocketNames.onlineUsers, {
        onlineUsers: Object.values(onlineUsers),
      });
    }
  }
};
