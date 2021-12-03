import SongNotFound from '../errors/SongNotFound.js';
import ValidationError from '../errors/ValidationError.js';
import * as validations from '../validations/validations.js';
import * as recommendationService from '../services/recommendationService.js';

import connection from '../database.js';

export async function createRecommendation(req, res, next) {
  try {
    await validations.validateRecommendation(req.body);
    await recommendationService.createRecommendation(req.body);

    res.sendStatus(201);
  } catch (err) {
    if (err instanceof ValidationError) return res.status(400).send(err.message);
    if (err.code === '23505') return res.sendStatus(409);
    next(err);
  }
}

export async function getTopRecommendations(req, res, next) {
  try {
    await validations.validateAmount(req.params);
    const recommendations = await recommendationService.getTopRecommendations(req.params.amount);

    res.send(recommendations);
  } catch (err) {
    if (err instanceof ValidationError) return res.status(400).send(err.message);
    if (err instanceof SongNotFound) return res.status(404).send(err.message);
    next(err);
  }
}

export async function getRandomRecommendations(req, res, next) {
  try {
    const recommendations = await recommendationService.getRandomRecommendations();

    res.send(recommendations);
  } catch (err) {
    if (err instanceof SongNotFound) return res.status(404).send(err.message);
    next(err);
  }
}
