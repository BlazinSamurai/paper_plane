const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { OKAY_STATUS } = require("../utils/errors");
const { BadRequestError } = require("../utils/errors/badRequestError");
const { ConflictError } = require("../utils/errors/conflictError");
const { UnauthorizedError } = require("../utils/errors/UnauthorizedError");

// signup
const createUser = (req, res, next) => {
  const { userName, profilePic, email, password } = req.body;

  if (!email) {
    return next(new BadRequestError("Email is required"));
  }
  if (!password) {
    return next(new BadRequestError("Password is required"));
  }
  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return next(new ConflictError("This email already exists"));
      }
      return bcrypt.hash(password, 10).then((hash) =>
        User.create({ userName, profilePic, email, password: hash }).then(
          (user) =>
            res.status(OKAY_STATUS).send({
              userName: user.userName,
              profilePic: user.profilePic,
              email: user.email,
              _id: user._id,
            })
        )
      );
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError("Duplication error."));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data."));
      }
      return next(err);
    });
};

// login
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and Password fields are required."));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // authentication successful!
      // the controller should create a JSON web token (JWT) that expires after a week
      // JWT_SECRET contains a value of your secret key for the signature
      // Once the JWT has been created, it should be sent to the client.
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === "ReferenceError") {
        return next(new BadRequestError(err.message));
      }
      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedError(err.message));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  login,
};
