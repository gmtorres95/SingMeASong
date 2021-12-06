import supertest from 'supertest';
import '../../src/setup.js';
import app from '../../src/app.js';
import connection from '../../src/database.js';
import recommendationFactory from './factories/recommendationFactory.js';

const recommendation = recommendationFactory();
let id;

beforeAll(async () => {
  const result = await connection.query(
    'INSERT INTO songs (name, link) VALUES ($1, $2) RETURNING id',
    [recommendation.name, recommendation.youtubeLink] , 
  );
  id = result.rows[0].id;
});

afterAll(async () => {
  await connection.query('DELETE FROM songs');
  connection.end();
});

describe('/recommendations/:id/upvote', () => {
  it("Returns 200 for valid upvote request", async () => {
    const result = await supertest(app).post(`/recommendations/${id}/upvote`);
    expect(result.status).toBe(200);
  });

  it("Returns 404 for invalid ID", async () => {
    const result = await supertest(app).post(`/recommendations/0/upvote`);
    expect(result.status).toBe(404);
  });
});

describe('/recommendations/:id/downvote', () => {
  it("Returns 200 for valid upvote request", async () => {
    const result = await supertest(app).post(`/recommendations/${id}/downvote`);
    expect(result.status).toBe(200);
  });

  it("Returns 404 for invalid ID", async () => {
    const result = await supertest(app).post(`/recommendations/0/downvote`);
    expect(result.status).toBe(404);
  });
});
