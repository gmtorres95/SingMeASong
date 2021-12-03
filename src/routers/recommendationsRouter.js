import { Router } from 'express';
import formatLink from '../middlewares/formatLink.js';
import * as recommendationsController from '../controllers/recommendationsController.js';

const router = new Router();

router.get('/recommendations/top/:amount', recommendationsController.getTopRecommendations);
router.get('/recommendations/random', recommendationsController.getRandomRecommendations);

router.use(formatLink);
router.post('/recommendations', recommendationsController.createRecommendation);

export default router;
