import { connect } from "mongoose";

function init(): void {
  connect(<string>process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error(error));
}

export default {
  init
};