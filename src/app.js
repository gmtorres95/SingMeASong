import express from 'express';
import cors from 'cors';

import formatLink from './middlewares/formatLink.js';
import errorHandler from './middlewares/errorHandler.js';
import * as recommendationsController from './controllers/recommendationsController.js';
import * as votesController from './controllers/votesController.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => res.sendStatus(200));
app.post('/recommendations', formatLink, recommendationsController.createRecommendation);
app.post('/recommendations/:id/upvote', votesController.vote);

app.use(errorHandler);

export default app;
