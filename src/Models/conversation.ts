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
//   class Conversation extends Model<
//     InferAttributes<Conversation>,
//     InferCreationAttributes<Conversation>
//   > {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models: any) {
//       // define association here
//       models.Conversation.hasMany(models.User);
//     }
//   }
//   Conversation.init(
//     {
//       userId: DataTypes.STRING,
//       messages: DataTypes.ARRAY(DataTypes.JSON),
//     },
//     {
//       sequelize,
//       modelName: "Conversation",
//     }
//   );// };

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
    "Conversation",
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
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
    },
    { timestamps: true }
  );
