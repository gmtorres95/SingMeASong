import connection from '../database.js';

export async function createRecommendation({ name, youtubeLink }) {
  await connection.query(
    'INSERT INTO songs (name, link) VALUES ($1, $2)',
    [name, youtubeLink],
  );
}

export async function getTopRecommendations(amount) {
  const result = await connection.query(`
    SELECT
      songs.*,
      (
        SELECT
          (SELECT COUNT(*) FROM votes WHERE (song_id = songs.id AND is_upvote = TRUE))
          -
          (SELECT COUNT(*) FROM votes WHERE (song_id = songs.id AND is_upvote = FALSE))
        TotalCount
      ) as score
    FROM songs
    ORDER BY score DESC
    LIMIT $1`,
    [amount],
  );
  return result.rows;
}
