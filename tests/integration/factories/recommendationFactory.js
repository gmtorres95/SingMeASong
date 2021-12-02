import faker from 'faker';

export default function recommendationFactory() {
  return {
    name: faker.datatype.string(30),
    youtubeLink: faker.internet.password(11, false, /[a-z\-_]/i),
  }
}
