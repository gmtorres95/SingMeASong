import express from 'express';
import cors from 'cors';

import errorHandler from './middlewares/errorHandler.js';
import reccomendationsRouter from './routers/recommendationsRouter.js';
import votesRouter from './routers/votesRouter.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => res.sendStatus(200));
app.use(reccomendationsRouter);
app.use(votesRouter);

app.use(errorHandler);

export default app;
