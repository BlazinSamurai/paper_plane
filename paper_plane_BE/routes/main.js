const router = require("express").Router();
// const {
//   validateUserLogin,
//   validateUserInfo,
// } = require("../middlewares/validation");
const { login, createUser } = require("../controllers/users");

//will eventually need validation for create and login
router.post("/signup", createUser);

router.post("/login", login);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found."));
});

module.exports = router;
