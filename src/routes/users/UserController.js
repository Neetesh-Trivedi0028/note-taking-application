const {
  model: { User },
} = require("../../../common/models");

const {
  signToken,
  getPlatform,
  utcDateTime,
} = require("./../../../common/utils/utils");

class UserController {
  async registerUser(req, res, next) {
    try {
      const { username, email, password } = req.body;
      let userExist = await User.findOne({ email });
      if (userExist) {
        return res.warn({}, "User already registerd !");
      }
      const platform = getPlatform(req);
      const userData = new User();
      userData.username = username;
      userData.email = email;
      userData.password = password;
      userData.authTokenIssuedAt = utcDateTime().valueOf();
      const newUser = await userData.save();
      const token = signToken(newUser, platform);
      const registerdUser = userData.toJSON();
      ["password", "__v", "created", "updated", "authTokenIssuedAt"].forEach(
        (key) => delete registerdUser[key]
      );
      return res.created(
        {
          token,
          registerdUser,
        },
        "User register Successfuly !!"
      );
    } catch (err) {
      return next(err);
    }
  }

  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.warn({}, "User not found !");
      }
      if (user.email !== email) {
        return res.warn({}, "Please input correct credentials !");
      }
      const passwordMatched = await user.comparePassword(password);
      if (!passwordMatched) {
        return res.warn({}, "Please input correct credentials !");
      }
      user.authTokenIssuedAt = utcDateTime().valueOf();
      await user.save();
      const platform = getPlatform(req);
      const token = signToken(user, platform);
      user = user.toJSON();
      ["password", "__v", "created", "updated", "authTokenIssuedAt"].forEach(
        (key) => delete user[key]
      );
      return res.success({ token, user }, "User login Successfuly check 3 !!");
    } catch (err) {
      return next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { user } = req;
      user.authTokenIssuedAt = null;
      await user.save();
      return res.success({}, "logout successfuly !!");
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new UserController();
