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
