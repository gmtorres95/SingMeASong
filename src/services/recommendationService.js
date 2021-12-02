import * as recommendationRepository from '../repositories/reccomendationRepository.js';

export async function createRecommendation(recommendation) {
  await recommendationRepository.createRecommendation(recommendation);
}
