import SongNotFound from '../errors/SongNotFound.js';
import * as votesRepository from '../repositories/votesRepository.js';

export async function vote(id, isUpvote) {
  const score = await votesRepository.getSongScore(id);
  if (score === undefined) throw new SongNotFound('This song does not exist');

  const newScore = isUpvote ? (score + 1) : (score - 1);

  await votesRepository.vote(newScore, id);
  if (newScore < -5) await votesRepository.deleteSong(id);
}
