import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createServer } from 'http';
import { connect } from 'mongoose';
import routes from './routes/index';
import io from './services/socket';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '/', allowedHeaders: 'Authorization' }));
app.use(express.static('public'));
app.use(routes);

const server = createServer(app);
const socket = io(server);

app.set('socket', socket);

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
