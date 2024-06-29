const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { User } = require("../models/model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.signToken = (user, platform) => {
  const payload = {
    sub: user._id,
    aud: platform,
    iat: user.authTokenIssuedAt,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.getPlatform = (req) => {
  const device = req.headers["x-notes-platform"];
  return device;
};

exports.utcDateTime = (date = new Date()) => {
  date = new Date(date);
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
  );
};

exports.protectRoute = async (req, res, next) => {
  let token;
  //1 getting token and check of it's there
  if (req.headers.authorization) {
    token = req.headers.authorization;
  }
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.unauthorized(null, "Unauthorized access !");
  }

  //2 verification token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //3 check if user is still exists

  const currentUser = await User.findOne({
    _id: new ObjectId(decode.sub),
    authTokenIssuedAt: decode.iat,
  });

  if (!currentUser) {
    return res.unauthorized(
      null,
      "The user beloging to this token does no longer exist."
    );
  }
  // grant access to protected route
  req.user = currentUser;
  next();
};
