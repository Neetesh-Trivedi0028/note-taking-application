module.exports = (ValidationsObj, dataToValidate = "body") => {
  return (req, res, next) => {
    const { error } = ValidationsObj.validate(req[dataToValidate], {
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
};
