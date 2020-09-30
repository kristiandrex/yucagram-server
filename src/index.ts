import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connect } from 'mongoose';
import { createServer } from 'http';
import cors from 'cors';
import path from 'path';
import io from './services/socket';
import routes from './routes/index';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '/', allowedHeaders: 'Authorization' }));
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.get('/*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}

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