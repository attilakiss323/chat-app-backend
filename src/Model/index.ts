import { Sequelize, DataTypes } from "sequelize";

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5433
//database name is discover
const sequelize = new Sequelize(
  `postgres://postgres:admin@localhost:5432/chat-app-db`,
  { dialect: "postgres" }
);

//checking if connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
  })
  .catch((err: string) => {
    console.log(err);
  });

const users = require("./userModel")(sequelize, DataTypes);

export const db = {
  sequelize,
  Sequelize,
  users,
};
