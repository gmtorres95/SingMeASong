import * as votesRepository from '../../src/repositories/votesRepository.js';
import * as sut from '../../src/services/votesService.js';

jest.mock('../../src/errors/SongNotFound.js');

describe('vote', () => {
  it("Returns ", async () => {
    jest.spyOn(votesRepository, 'getSongScore').mockReturnValueOnce([]);
    expect(async () => {
      await sut.vote(0);
    }).rejects.toThrow();
  });
});
