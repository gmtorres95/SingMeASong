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

export async function getMaxAndMinScores() {
  const result = await connection.query(`
    SELECT
      (SELECT score AS "maxScore" FROM songs ORDER BY score DESC LIMIT 1),
      (SELECT score AS "minScore" FROM songs ORDER BY score LIMIT 1)`
  );
  return result.rows[0];
}

export async function getRandomRecommendations(filter) {
  const result = await connection.query(
    `SELECT * FROM songs ${filter}ORDER BY RANDOM() LIMIT 1`
  );
  return result.rows;
}
