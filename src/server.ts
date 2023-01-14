import express from "express";
import cookieParser from "cookie-parser";
import { db } from "./Models";
import router from "./Routes";
import { sockets, SocketNames } from "./Sockets";
import dotenv from "dotenv";
import { Server } from "socket.io";

// initialize env variables
dotenv.config();

// setting up port and socket
const PORT = process.env.PORT || 8080;

// assigning the variable app to express
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false }).then(() => {
  console.log("db has been re sync");
});

// routes for the user API
app.use("/", router);

// listening to server connection
const server = app.listen(PORT, () =>
  console.log(`Server is connected on ${PORT}`)
);

// websocket
const io = new Server(server);

io.on(SocketNames.connect, sockets);
