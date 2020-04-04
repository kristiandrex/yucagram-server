import { config } from 'dotenv';
import express from 'express';

config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
  console.log('Server on port ', process.env.PORT);
});