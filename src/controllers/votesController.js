import SongNotFound from '../errors/SongNotFound.js';
import * as votesService from '../services/votesService.js';

export async function vote(req, res, next) {
  try {
    const isUpvote = req.url.split('/')[3] === 'upvote';
    await votesService.vote(req.params.id, isUpvote);

    res.sendStatus(200);
  } catch (err) {
    if (err instanceof SongNotFound) return res.status(404).send(err.message);
    next(err);
  }
}
