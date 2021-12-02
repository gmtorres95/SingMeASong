import joi from 'joi';

export const recommendationSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(255)
    .required(),
  youtubeLink: joi
    .string()
    .pattern(/^https:\/\/youtu\.be\/[a-zA-Z]{11}$/)
    .required(),
});
