import mongoose from "mongoose";
import { MONGO_URI } from "@config";

function connect(): void {
  mongoose
    .connect(<string>MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then((db) => console.log("Connected to MongoDB: ", db.connection.name))
    .catch((error) => console.error(error));
}

export default {
  connect
};
