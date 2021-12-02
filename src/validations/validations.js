import ValidationError from '../errors/ValidationError.js';
import * as schemas from './schemas.js';

export default async function validateRecommendation(recommendation) {
  const joiValidation = schemas.recommendationSchema.validate(recommendation);
  if (joiValidation.error) throw new ValidationError(joiValidation.error.details[0].message);
}
