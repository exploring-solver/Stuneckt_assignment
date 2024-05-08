const Joi = require('@hapi/joi');

const schemas = {
  post: Joi.object().keys({
    user: Joi.string().default(0),
    textContent: Joi.string().required(),
    media: Joi.array().items(Joi.string()).default([]),
    timestamp: Joi.date().default(Date.now),
    likes: Joi.number().default(0),
    retweets: Joi.number().default(0),
    comments: Joi.array()
      .items(
        Joi.object().keys({
          user: Joi.string().required(),
          textContent: Joi.string().required(),
          timestamp: Joi.date().default(Date.now),
        })
      )
      .default([]),
    hashtags: Joi.array().items(Joi.string()).default([]),
    mentions: Joi.array().items(Joi.string()).default([]),
  }),
};

module.exports = schemas;
