import { Router } from 'express';
import * as votesController from '../controllers/votesController.js';

const router = new Router();

router.post('/recommendations/:id/upvote', votesController.vote);
router.post('/recommendations/:id/downvote', votesController.vote);

export default router;
