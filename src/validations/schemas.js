import joi from 'joi';

export const recommendationSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(255)
    .required(),
  youtubeLink: joi
    .string()
    .pattern(/^https:\/\/youtu\.be\/[a-zA-Z0-9\-_]{11}$/)
    .required(),
});

export const amountSchema = joi.object({
  amount: joi
    .number()
    .integer()
    .positive()
    .required(),
});
