import "dotenv/config";
import express from "express";
import { createServer } from "http";
import cors from "cors";
import { clientUrl, port } from "@config";
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

server.listen(port, () => {
  console.log("Server on port", port);
});

mongoose.connect();
