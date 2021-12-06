import connection from '../../src/database.js';
import SongNotFound from '../../src/errors/SongNotFound.js';
import * as sut from '../../src/services/votesService.js';
import * as votesRepository from '../../src/repositories/votesRepository.js';

afterAll(() => connection.end());

describe('vote(id, isUpvote)', () => {
  jest.spyOn(votesRepository, 'deleteSong');
  jest.spyOn(votesRepository, 'vote');

  it("Throws SongNotFound if no song match the provided ID", async () => {
    jest.spyOn(votesRepository, 'getSongScore').mockReturnValueOnce(undefined);
    const result = sut.vote();
    await expect(result).rejects.toThrowError(SongNotFound);
  });

  it("Returns 'Vote registered' for valid upvote request", async () => {
    jest.spyOn(votesRepository, 'getSongScore').mockReturnValueOnce(-5);
    const result = await sut.vote(1, true);
    expect(result.message).toBe('Vote registered');
  });

  it("Returns 'Vote registered' for valid downvote request", async () => {
    jest.spyOn(votesRepository, 'getSongScore').mockReturnValueOnce(0);
    const result = await sut.vote(1, false);
    expect(result.message).toBe('Vote registered');
  });

  it("Returns 'Vote registered and song deleted' for valid downvote request with score -5", async () => {
    jest.spyOn(votesRepository, 'getSongScore').mockReturnValueOnce(-5);
    const result = await sut.vote(1, false);
    expect(result.message).toBe('Vote registered and song deleted');
  });
});
