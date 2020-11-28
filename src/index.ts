import dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import { createServer } from 'http';
import cors from 'cors';

dotenv.config();

import io from 'src/services/socket';
import routes from "src/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '/', allowedHeaders: 'Authorization' }));
app.use('/api', routes);

const server = createServer(app);

io.connect(server);

server.listen(process.env.PORT, () => {
  console.log('Server on port', process.env.PORT);
});

connect(<string>process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error(error));