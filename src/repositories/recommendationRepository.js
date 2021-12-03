import connection from '../database.js';

export async function createRecommendation({ name, youtubeLink }) {
  await connection.query(
    'INSERT INTO songs (name, link) VALUES ($1, $2)',
    [name, youtubeLink],
  );
}

export async function getTopRecommendations(amount) {
  const result = await connection.query(
    'SELECT * FROM songs ORDER BY score DESC LIMIT $1',
    [amount],
  );
  return result.rows;
}
