import SongNotFound from '../errors/SongNotFound.js';
import * as recommendationsRepository from '../repositories/recommendationsRepository.js';

export async function createRecommendation(recommendation) {
  await recommendationsRepository.createRecommendation(recommendation);
}

export async function getTopRecommendations(amount) {
  const recommendations = await recommendationsRepository.getTopRecommendations(amount);
  if (!recommendations.length) throw new SongNotFound('There is no songs to recommend');
  return recommendations;
}

export async function getRandomRecommendations() {
  const scores = await recommendationsRepository.getMaxAndMinScores();
  if (scores.maxScore === null) throw new SongNotFound('There is no songs to recommend');

  let filter = '';
  const randomNumber = Math.random();
  if (randomNumber > 0.3 && scores.maxScore > 10) filter = 'WHERE score > 10 ';
  if (randomNumber <= 0.3 && scores.minScore <= 10) filter = 'WHERE score <= 10 ';

  const recommendations = await recommendationsRepository.getRandomRecommendations(filter);
  if (!recommendations.length) throw new SongNotFound('There is no songs to recommend');
  return recommendations;
}
