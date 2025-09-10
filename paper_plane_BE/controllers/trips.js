const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Trip = require("../models/trip");
const { OKAY_STATUS } = require("../utils/errors");
const { BadRequestError } = require("../utils/errors/badRequestError");
const { NotFoundError } = require("../utils/errors/notFoundError");
const { ConflictError } = require("../utils/errors/conflictError");
const { UnauthorizedError } = require("../utils/errors/UnauthorizedError");

const createTrip = (req, res, next) => {
  const { destination, tripName, startDate, endDate } = req.body;
  const owner = req.user._id;

  Trip.create({ destination, tripName, startDate, endDate, owner })
    .then((newTrip) => {
      res.status(OKAY_STATUS).send(newTrip);
    })
    .catch((e) => {
      console.error(e);
    });
};

const getTrips = (req, res, next) => {
  console.log("Hello from getTrips inside trips.js on the BE!");
};

module.exports = { createTrip, getTrips };
