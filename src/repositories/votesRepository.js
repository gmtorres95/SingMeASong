import connection from '../database.js';

export async function getSongScore(id) {
  const result = await connection.query(
    'SELECT score FROM songs WHERE id = $1',
    [id],
  );
  return result.rows[0]?.score;
}

export async function vote(score, id) {
  await connection.query(
    'UPDATE songs SET score = $1 WHERE id = $2',
    [score, id],
  );
}

export async function deleteSong(id) {
  await connection.query(
    'DELETE FROM songs WHERE id = $1',
    [id],
  );
}
