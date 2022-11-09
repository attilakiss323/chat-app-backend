import { Sequelize } from "sequelize";

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

const users = require("./userModel")(sequelize);

export const db = {
  sequelize,
  Sequelize,
  users,
};
