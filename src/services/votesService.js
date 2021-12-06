import SongNotFound from '../errors/SongNotFound.js';
import * as votesRepository from '../repositories/votesRepository.js';

export async function vote(id, isUpvote) {
  const score = await votesRepository.getSongScore(id);
  if (score === undefined) throw new SongNotFound('This song does not exist');

  const newScore = isUpvote ? score + 1 : score - 1;
  if (!isUpvote && score <= -5) {
    await votesRepository.deleteSong(id);
    return { message: 'Vote registered and song deleted' };
  }
  await votesRepository.vote(newScore, id);
  return { message: 'Vote registered' };
}
