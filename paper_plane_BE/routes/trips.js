const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getTrips } = require("../controllers/trips");

router.get("/", getTrips);

module.exports = router;
