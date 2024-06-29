const Joi = require("joi");
const {
  enums: { Platform },
} = require("../models");

const headerValidations = Joi.object({
  "x-notes-platform": Joi.string()
    .valid(...Object.values(Platform))
    .required(),
  "x-notes-version": Joi.string()
    .regex(/^[\d]+\.[\d]+\.[\d]+$/, "Semantic Version")
    .required(),
}).required();

module.exports = (req, res, next) => {
  const { error } = headerValidations.validate(req.headers, {
    allowUnknown: true,
  });
  if (error) {
    return res.status(400).send({
      success: false,
      data: {},
      message: error.details[0].message,
    });
  }
  next();
};
