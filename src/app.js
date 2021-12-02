import express from 'express';
import cors from 'cors';

import * as recommendationsController from './controllers/recommendationsController.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => res.sendStatus(200));

app.post('/recommendations', recommendationsController.createRecommendation);

export default app;
