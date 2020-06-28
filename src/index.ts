import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createServer } from 'http';
import { connect } from 'mongoose';
import routes from './routes/index';
import io from './services/socket';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '/', allowedHeaders: 'Authorization' }));
app.use(express.static('public'));
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const server = createServer(app);

app.set('socket', io(server));

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
