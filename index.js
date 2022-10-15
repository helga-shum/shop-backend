import express from 'express';
import { registerValidator, loginValidator } from './validation.js';
import mongoose from 'mongoose';
import cors from 'cors';
import checkAuth from './utils/checkAuth.js';
mongoose
  .connect(
    'mongodb+srv://incertus-helga:wwwwww@cluster0.b8g1qcv.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => console.log('server OK'))
  .catch((err) => console.log('error', err));
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world');
});
app.listen(5555, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('server ok');
});

app.use(express.json());
app.use(cors());
