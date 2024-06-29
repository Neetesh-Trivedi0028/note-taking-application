const Joi = require("joi");

const requirebody = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const requireLoginBody = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  requireLoginBody,
  requirebody,
};
