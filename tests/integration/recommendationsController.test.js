import supertest from 'supertest';
import '../../src/setup.js';
import app from '../../src/app.js';
import connection from '../../src/database.js';
import recommendationFactory from './factories/recommendationFactory.js';

beforeEach(async () => {
  const {
    name,
    youtubeLink,
  } = recommendationFactory();
  await connection.query(
    'INSERT INTO songs (name, link) VALUES ($1, $2)',
    [name, youtubeLink],
  );
});

afterAll(async () => {
  await connection.query('DELETE FROM songs');
  connection.end();
});

describe('/recommendations', () => {
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

describe('/recommendations/top/:amount', () => {
  it("Returns 200 for valid request", async () => {
    const amount = 3;
    const result = await supertest(app).get(`/recommendations/top/${amount}`);
    expect(result.body.length).toBe(amount);
  });

  it("Returns 400 for invalid amount", async () => {
    const amount = -1;
    const result = await supertest(app).get(`/recommendations/top/${amount}`);
    expect(result.status).toBe(400);
  });

  it("Returns 404 if there is no song to return", async () => {
    await connection.query('DELETE FROM songs');
    const amount = 1;
    const result = await supertest(app).get(`/recommendations/top/${amount}`);
    expect(result.status).toBe(404);
  });
});

describe('/recommendations/random', () => {
  it("Returns 200 for valid request", async () => {
    const result = await supertest(app).get('/recommendations/random');
    expect(result.status).toBe(200);
  });

  it("Returns 404 if there is no song to return", async () => {
    await connection.query('DELETE FROM songs');
    const result = await supertest(app).get('/recommendations/random');
    expect(result.status).toBe(404);
  });
});
