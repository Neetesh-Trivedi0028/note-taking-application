const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const requireId = Joi.object().keys({
  id: Joi.objectId().valid().required(),
});

const requirebody = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required(),
  tags: Joi.string().optional().allow(""),
});

module.exports = {
  requireId,
  requirebody,
};
