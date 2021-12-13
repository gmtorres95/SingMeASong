import SongNotFound from '../errors/SongNotFound.js';
import * as votesRepository from '../repositories/votesRepository.js';

export async function vote(id, isUpvote) {
  let score = await votesRepository.getSongScore(id);
  if (score === undefined) throw new SongNotFound('This song does not exist');
  if (!isUpvote && score <= -5) {
    await votesRepository.deleteSong(id);
    return { message: 'Vote registered and song deleted' };
  }

  score = isUpvote ? score + 1 : score - 1;
  await votesRepository.vote(score, id);
  return { message: 'Vote registered' };
}
