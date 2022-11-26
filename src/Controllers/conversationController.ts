import { db } from "../Models";
import { Request, Response } from "express";
import { UserInstance } from "Models/user";
import { ConversationInstance } from "Models/conversation";

const Conversation = db.conversation;
const User = db.user;

export const conversation = async (req: Request, res: Response) => {
  try {
    const { email, contact } = req.body;

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

      return res.status(201).send(userWithConversation);
    } else {
      return res.status(409).send({ error: "Conversation not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
