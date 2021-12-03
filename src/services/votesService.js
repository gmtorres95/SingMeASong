import SongNotFound from '../errors/SongNotFound.js';
import * as votesRepository from '../repositories/votesRepository.js';

export async function vote(id, isUpvote) {
  const score = await votesRepository.getSongScore(id);
  if (score === undefined) throw new SongNotFound('This song does not exist');

  await votesRepository.vote(id, isUpvote);
  if (!isUpvote && score <= -5) await votesRepository.deleteSong(id);
}
