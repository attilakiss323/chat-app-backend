import { Socket } from "socket.io";
import { db } from "../Models";
import { UserInstance } from "Models/user";
import { ConversationInstance } from "Models/conversation";

const Conversation = db.conversation;
const User = db.user;

type ConversationSocketType = {
  data: { email: string; contact: string };
  callback: (args: any) => void;
};

export const conversationSocket = async (
  { email, contact }: ConversationSocketType["data"],
  callback: ConversationSocketType["callback"]
) => {
  const user = (await User.findOne({
    where: { email },
    include: {
      model: Conversation,
      as: "conversation",
      where: { contact },
    },
  })) as UserInstance & {
    conversation: ConversationInstance[];
  };

  if (user) {
    const { firstName, lastName, email, conversation } = user;
    const { messages, contact } = conversation[0];

    const userWithConversation = {
      firstName,
      lastName,
      email,
      conversation: {
        messages,
        contact,
      },
    };

    callback(userWithConversation);
  } else {
    callback({ error: "Conversation not found" });
  }
};
