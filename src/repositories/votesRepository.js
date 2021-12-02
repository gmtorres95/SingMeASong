import connection from '../database.js';

export async function getSong(id) {
  return await connection.query(
    'SELECT id FROM songs WHERE id = $1',
    [id],
  );
}

export async function vote(id, isUpvote = true) {
  await connection.query(
    'INSERT INTO votes (song_id, is_upvote) VALUES ($1, $2)',
    [id, isUpvote],
  );
}
