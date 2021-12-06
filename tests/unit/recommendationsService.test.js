import connection from '../../src/database.js';
import SongNotFound from '../../src/errors/SongNotFound.js';
import * as sut from '../../src/services/recommendationsService.js';
import * as recommendationsRepository from '../../src/repositories/recommendationsRepository.js';

afterAll(() => connection.end());

describe('getTopRecommendations(amount)', () => {
  it("Throws SongNotFound if there's no song to return", async () => {
    jest.spyOn(recommendationsRepository, 'getTopRecommendations').mockReturnValueOnce([]);
    const result = sut.getTopRecommendations();
    await expect(result).rejects.toThrowError(SongNotFound);
  });

  it("Returns list with length === amount", async () => {
    const amount = 5;
    const mockedReturn = [1, 2, 3, 4, 5];
    jest.spyOn(recommendationsRepository, 'getTopRecommendations').mockReturnValueOnce(mockedReturn);
    const result = await sut.getTopRecommendations(amount);
    expect(result.length).toBe(amount);
  });
});

describe('getRandomRecommendations()', () => {
  it("Throws SongNotFound if there's no scores", async () => {
    jest.spyOn(recommendationsRepository, 'getMaxAndMinScores').mockReturnValueOnce({ maxScore: null });
    const result = sut.getRandomRecommendations();
    await expect(result).rejects.toThrowError(SongNotFound);
  });

  it("Throws SongNotFound if there's no song to return", async () => {
    jest.spyOn(recommendationsRepository, 'getMaxAndMinScores').mockReturnValueOnce({ maxScore: 0 });
    jest.spyOn(Math, 'random');
    jest.spyOn(recommendationsRepository, 'getRandomRecommendations').mockReturnValueOnce([]);

    const result = sut.getRandomRecommendations();
    await expect(result).rejects.toThrowError(SongNotFound);
  });

  it("Returns score === 100 if randomNumber > 0.3 and maxScore > 10", async () => {
    jest.spyOn(recommendationsRepository, 'getRandomRecommendations').mockImplementation((filter) => {
      if (filter === 'WHERE score > 10 ') return [{ score: 100 }];
      if (filter === 'WHERE score <= 10 ') return [{ score: -5 }];
      return [{ score: 10 }];
    });

    jest.spyOn(recommendationsRepository, 'getMaxAndMinScores').mockReturnValueOnce({ maxScore: 11 });
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.31);
    const result = await sut.getRandomRecommendations();
    expect(result[0].score).toBe(100);
  });

  it("Returns score === -5 if randomNumber <= 0.3 and minScore <= 10", async () => {
    jest.spyOn(recommendationsRepository, 'getMaxAndMinScores').mockReturnValueOnce({ minScore: 10 });
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.30);
    const result = await sut.getRandomRecommendations();
    expect(result[0].score).toBe(-5);
  });

  it("Returns score === 10 if randomNumber > 0.3 but maxScore <= 10", async () => {
    jest.spyOn(recommendationsRepository, 'getMaxAndMinScores').mockReturnValueOnce({ maxScore: 10 });
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.31);
    const result = await sut.getRandomRecommendations();
    expect(result[0].score).toBe(10);
  });

  it("Returns score === 10 if randomNumber <= 0.3 but minScore > 10", async () => {
    jest.spyOn(recommendationsRepository, 'getMaxAndMinScores').mockReturnValueOnce({ minScore: 11 });
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.30);
    const result = await sut.getRandomRecommendations();
    expect(result[0].score).toBe(10);
  });

  it("Returns score === 10 if maxScore > 10 but randomNumber <= 0.3", async () => {
    jest.spyOn(recommendationsRepository, 'getMaxAndMinScores').mockReturnValueOnce({ maxScore: 11 });
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.30);
    const result = await sut.getRandomRecommendations();
    expect(result[0].score).toBe(10);
  });

  it("Returns score === 10 if minScore <= 10 but randomNumber > 0.3", async () => {
    jest.spyOn(recommendationsRepository, 'getMaxAndMinScores').mockReturnValueOnce({ minScore: 10 });
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.31);
    const result = await sut.getRandomRecommendations();
    expect(result[0].score).toBe(10);
  });
});
