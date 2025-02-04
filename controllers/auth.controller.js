const createError = require("http-errors");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

module.exports.getUser = (req, res, next) => {
  User.findById(req.currentUserid)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch(next);
};

module.exports.register = (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const loginError = createError(401, "Email or password incorrect");

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return next(loginError);
      }

      return user.checkPassword(password).then((match) => {
        if (!match) {
          return next(loginError);
        }

        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET || "changeme",
          { expiresIn: "1d" }
        );
        //klahsdklahslfbaosd,. 12903u190239012u309234,2189472984912849012
        res.json({ accessToken: token });
      });
    })
    .catch(next);
};
