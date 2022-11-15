import { db } from "../Models";
import { Request, Response } from "express";

const Conversation = db.conversation;
const User = db.user;

export const conversation = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    console.log("email ::::::::::::::::::::", email);

    const user = await User.findOne({
      include: { model: Conversation, as: "conversations" },
      where: { email },
    });

    console.log("user :::::::::::::::::::", user);
    // const conversation = await Conversation.findOne({
    //   include: User,
    //   where: { email },
    // });

    // console.log("Conversation", conversation);
    if (user) {
      return res.status(201).send(user);
    } else {
      return res.status(409).send({ error: "Conversation not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
