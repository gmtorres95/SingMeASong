import express from 'express';
import cors from 'cors';

import reccomendationsRouter from './routers/recommendationsRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import * as votesController from './controllers/votesController.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => res.sendStatus(200));
app.use(reccomendationsRouter);
app.post('/recommendations/:id/upvote', votesController.vote);
app.post('/recommendations/:id/downvote', votesController.vote);

app.use(errorHandler);

export default app;
