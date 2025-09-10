const router = require("express").Router();
const auth = require("../middlewares/auth");
const userRouter = require("./users");
const tripRouter = require("./trips");
// const {
//   validateUserLogin,
//   validateUserInfo,
// } = require("../middlewares/validation");
const {
  loginViaUsername,
  loginViaEmail,
  createUser,
} = require("../controllers/users");
const { createTrip } = require("../controllers/trips");
const { NotFoundError } = require("../utils/errors/notFoundError");

router.post("/signup", createUser);

router.post("/loginViaUsername", loginViaUsername);

router.post("/loginViaEmail", loginViaEmail);

// C.R.U.D
// CREATE
router.post("/createTrip", auth, createTrip);

router.use("/users", userRouter);

router.use("/trips", tripRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found."));
});

module.exports = router;
