import supertest from 'supertest';
import app from '../../src/app.js';

describe('/health', () => {
  it("Returns 200 for valid request", async () => {
    const result = await supertest(app).get('/health');
    expect(result.status).toBe(200);
  });
});
