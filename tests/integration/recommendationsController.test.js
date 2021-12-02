import supertest from 'supertest';
import '../../src/setup.js';
import app from '../../src/app.js';
import connection from '../../src/database.js';
import recommendationFactory from './factories/recommendationFactory.js';

afterAll(async () => {
  await connection.query(`DELETE FROM songs`);
  connection.end();
})

describe('createRecommendation', () => {
  const recommendation = recommendationFactory();

  it("Returns 201 for valid request", async () => {
    const result = await supertest(app).post('/recommendations').send(recommendation);
    expect(result.status).toBe(201);
  });

  it("Returns 409 for duplicated link request", async () => {
    const result = await supertest(app).post('/recommendations').send(recommendation);
    expect(result.status).toBe(409);
  });

  it("Returns 400 for invalid name", async () => {
    const body = {
      name: recommendation.name.slice(0,2),
      youtubeLink: recommendation.youtubeLink,
    };
    const result = await supertest(app).post('/recommendations').send(body);
    expect(result.status).toBe(400);
  });

  it("Returns 400 for invalid youtubeLink", async () => {
    const body = {
      name: recommendation.name,
      youtubeLink: `INVALID ${recommendation.youtubeLink}`,
    };
    const result = await supertest(app).post('/recommendations').send(body);
    expect(result.status).toBe(400);
  });

  it("Returns 400 for missing params", async () => {
    const result = await supertest(app).post('/recommendations').send();
    expect(result.status).toBe(400);
  });
});
