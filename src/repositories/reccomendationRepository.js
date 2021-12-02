import connection from '../database.js';

export async function createRecommendation({ name, youtubeLink }) {
  await connection.query(
    'INSERT INTO songs (name, link) VALUES ($1, $2)',
    [name, youtubeLink],
  );
}
