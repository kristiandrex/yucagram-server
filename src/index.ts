import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import cors from "cors";

dotenv.config();

if (process.env.NODE_ENV === "production") {
  require("module-alias/register");
}

import { clientUrl } from "@config";
import routes from "@routes/index";
import socket from "@services/socket";
import mongoose from "@services/mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: clientUrl }));
app.use("/", routes);

const server = createServer(app);

socket.connect(server);

server.listen(process.env.PORT, () => {
  console.log("Server on port", process.env.PORT);
});

mongoose.connect();
