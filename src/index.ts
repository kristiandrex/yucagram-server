import "module-alias/register";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import cors from "cors";

import mongo from "@util/mongo";
import socket from "@util/socket";
import routes from "@routes/";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", routes);

const server = createServer(app);

socket.init(server);

server.listen(process.env.PORT, () => {
  console.log("Server on port", process.env.PORT);
});

mongo.init();