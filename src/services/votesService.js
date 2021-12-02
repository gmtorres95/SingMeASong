import SongNotFound from '../errors/SongNotFound.js';
import * as votesRepository from '../repositories/votesRepository.js';

export async function vote(id, isUpvote) {
  const song = await votesRepository.getSongScore(id);
  if (!song.rowCount) throw new SongNotFound('This song does not exist');

  await votesRepository.vote(id, isUpvote);

  const score = song.rows[0].score - 1;
  if (!isUpvote && score < -5) await votesRepository.deleteSong(id);
}
