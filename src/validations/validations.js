import ValidationError from '../errors/ValidationError.js';
import * as schemas from './schemas.js';

export async function validateRecommendation(recommendation) {
  const joiValidation = schemas.recommendationSchema.validate(recommendation);
  if (joiValidation.error) throw new ValidationError(joiValidation.error.details[0].message);
}

export async function validateAmount(amount) {
  const joiValidation = schemas.amountSchema.validate(amount);
  if (joiValidation.error) throw new ValidationError(joiValidation.error.details[0].message);
}
