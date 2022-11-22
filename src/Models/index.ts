import { Sequelize } from "sequelize";
import { User } from "./user";
import { Conversation } from "./conversation";

// Database connection with dialect of postgres specifying the database we are using
const sequelize = new Sequelize(
  `postgres://postgres:admin@localhost:5432/chat-app-db`,
  { dialect: "postgres" }
);

// checking if connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
  })
  .catch((err: string) => {
    console.log(err);
  });

const user = User(sequelize);
const conversation = Conversation(sequelize);

user.hasMany(conversation, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "Conversation",
});

conversation.belongsTo(user, {
  foreignKey: "userId",
  as: "User",
});

export const db = {
  sequelize,
  Sequelize,
  user,
  conversation,
};
