"use strict";
import { Model, Sequelize, DataTypes, Optional } from "sequelize";
interface ConversationType {
  id: string;
  userId?: string;
  messages: Array<Object>;
}

interface ConversationCreationType extends Optional<ConversationType, "id"> {}

interface ConversationInstance
  extends Model<ConversationType, ConversationCreationType>,
    ConversationType {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Conversation = (sequelize: Sequelize) =>
  sequelize.define<ConversationInstance>(
    "conversation",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      messages: {
        type: DataTypes.JSON,
      },
    },
    { timestamps: true, tableName: "conversation" }
  );
