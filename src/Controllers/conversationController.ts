import { db } from "../Models";
import { Request, Response } from "express";

const Conversation = db.conversation;
const User = db.user;

export const conversation = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      where: { email },
      include: { model: Conversation, as: "Conversation" },
    });

    if (user) {
      return res.status(201).send(user);
    } else {
      return res.status(409).send({ error: "Conversation not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
