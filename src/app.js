import express from 'express';
import cors from 'cors';

import validateRecommendation from './validations/validations.js';
import ValidationError from './errors/ValidationError.js';
import connection from './database.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => res.sendStatus(200));

app.post('/recommendations', async (req, res) => {
  const {
    name,
    youtubeLink
  } = req.body;

  try {
    await validateRecommendation(req.body);

    await connection.query(
      'INSERT INTO songs (name, link) VALUES ($1, $2)',
      [name, youtubeLink],
    );

    res.sendStatus(201);
  } catch (err) {
    if (err instanceof ValidationError) return res.status(400).send(err.message);
    if (err.code === '23505') return res.sendStatus(409);
    res.sendStatus(500);
  }
});

export default app;
