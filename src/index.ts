import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import cors from "cors";

dotenv.config();

import routes from "@routes/index";
import socket from "@util/socket";
import mongoose from "@util/mongoose";

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

mongoose.init();