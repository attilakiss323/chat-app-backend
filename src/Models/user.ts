"use strict";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
  DataTypes,
  Optional,
} from "sequelize";

// module.exports = (sequelize: Sequelize) => {
//   class User extends Model<
//     InferAttributes<User>,
//     InferCreationAttributes<User>
//   > {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models: any) {
//       // define association here
//       models.User.hasMany(models.Conversation);
//     }
//   }
//   User.init(
//     {
//       firstName: DataTypes.STRING,
//       lastName: DataTypes.STRING,
//       email: DataTypes.STRING,
//       password: DataTypes.STRING,
//       conversationId: DataTypes.UUID,
//     },
//     {
//       sequelize,
//       modelName: "User",
//     }
//   );
//   return User;
// };

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
    "User",
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
