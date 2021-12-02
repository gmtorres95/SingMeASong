import validateRecommendation from '../validations/validations.js';
import ValidationError from '../errors/ValidationError.js';
import * as recommendationService from '../services/recommendationService.js';

export async function createRecommendation(req, res) {
  try {
    await validateRecommendation(req.body);
    await recommendationService.createRecommendation(req.body);

    res.sendStatus(201);
  } catch (err) {
    if (err instanceof ValidationError) return res.status(400).send(err.message);
    if (err.code === '23505') return res.sendStatus(409);
    res.sendStatus(500);
  }
}
