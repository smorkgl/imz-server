import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import { body, validationResult } from 'express-validator/check';

mongoose
  .connect(
    'mongodb+srv://catosrak:210976nL@test.qt168zu.mongodb.net/?retryWrites=true&w=majority&appName=test'
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Heltestlos World!');
});

app.post('/auth/register', registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  res.json({
    success: true,
  });
});

app.listen(3131, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
