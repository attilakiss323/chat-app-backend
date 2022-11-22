"use strict";
import { Model, Sequelize, DataTypes, Optional } from "sequelize";
interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserCreationType extends Optional<UserType, "id"> {}

interface UserInstance extends Model<UserType, UserCreationType>, UserType {
  createdAt?: Date;
  updatedAt?: Date;
}

export const User = (sequelize: Sequelize) =>
  sequelize.define<UserInstance>(
    "Users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: true }
  );
