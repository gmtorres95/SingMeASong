import connection from '../database.js';

export async function getSongScore(id) {
  const result = await connection.query(`
    SELECT
      (
        SELECT
          (SELECT COUNT(*) FROM votes WHERE (song_id = $1 AND is_upvote = TRUE))
          -
          (SELECT COUNT(*) FROM votes WHERE (song_id = $1 AND is_upvote = FALSE))
        TotalCount
      ) as score
    FROM songs
    WHERE id = $1`,
    [id],
  );
  return result.rows;
}

export async function vote(id, isUpvote = true) {
  await connection.query(
    'INSERT INTO votes (song_id, is_upvote) VALUES ($1, $2)',
    [id, isUpvote],
  );
}

export async function deleteSong(id) {
  await connection.query(
    'DELETE FROM votes WHERE song_id = $1',
    [id],
  );
  await connection.query(
    'DELETE FROM songs WHERE id = $1',
    [id],
  );
}
