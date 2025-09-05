const router = require("express").Router();
const userRouter = require("./users");
// const {
//   validateUserLogin,
//   validateUserInfo,
// } = require("../middlewares/validation");
const { login, createUser } = require("../controllers/users");
const { NotFoundError } = require("../utils/errors/notFoundError");

//will eventually need validation for create and login
router.post("/signup", createUser);

router.post("/login", login);

router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found."));
});

module.exports = router;
