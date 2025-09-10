const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const tripSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: [true, "The destination field is required."],
    minlength: 5,
    maxlength: 20,
  },
  tripName: {
    type: String,
    minlength: 1,
    maxlength: 20,
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: [true, "The start date is required."],
  },
  endDate: {
    type: Date,
    default: Date.now,
    required: [true, "The end date is required."],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("trip", tripSchema);
