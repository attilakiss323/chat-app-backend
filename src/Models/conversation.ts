"use strict";
import { Model, Sequelize, DataTypes, Optional } from "sequelize";
export interface ConversationType {
  id: string;
  userId?: string;
  messages: Array<Object>;
  contact: string;
}

export interface ConversationCreationType
  extends Optional<ConversationType, "id"> {}

export interface ConversationInstance
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
      contact: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      messages: {
        type: DataTypes.JSON,
      },
    },
    { timestamps: true, tableName: "conversation" }
  );
