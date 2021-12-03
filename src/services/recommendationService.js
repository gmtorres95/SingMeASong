import SongNotFound from '../errors/SongNotFound.js';
import * as recommendationRepository from '../repositories/recommendationRepository.js';

export async function createRecommendation(recommendation) {
  await recommendationRepository.createRecommendation(recommendation);
}

export async function getTopRecommendations(amount) {
  const recommendations = await recommendationRepository.getTopRecommendations(amount);
  if (!recommendations.length) throw new SongNotFound('There is no songs to recommend');

  return recommendations;
}
