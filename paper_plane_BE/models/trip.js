const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const tripSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: [true, "The destination field is required."],
    minlength: 4,
    maxlength: 20,
  },
  tripName: {
    type: String,
  },
  startDate: {
    type: String,
    required: [true, "Please provide a date in MMDDYYYY format."],

    // Use the `match` property to validate with a regular expression
    match: [
      // ^: Asserts the start of the string.
      // \d{8}: Matches exactly eight digits (\d for digit, {8} for exactly eight occurrences).
      // $: Asserts the end of the string.
      /^\d{8}$/,
      "The date must be an 8-digit string in MMDDYYYY format.",
    ],
  },
  endDate: {
    type: String,
    required: [true, "Please provide a date in MMDDYYYY format."],

    // Use the `match` property to validate with a regular expression
    match: [
      // ^: Asserts the start of the string.
      // \d{8}: Matches exactly eight digits (\d for digit, {8} for exactly eight occurrences).
      // $: Asserts the end of the string.
      /^\d{8}$/,
      "The date must be an 8-digit string in MMDDYYYY format.",
    ],
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

// Use a 'pre-save' hook to format the date
tripSchema.pre("save", function (next) {
  // START DATE
  // Only modify if startDate was provided and is not already in a valid format
  // if (this.isModified("startDate") && /^\d{8}$/.test(this.startDate)) {
  if (this.isModified("startDate") && this.startDate.length === 8) {
    // Extracting parts from the MMDDYYYY string
    const startMonth = this.startDate.substring(0, 2);
    const startDay = this.startDate.substring(2, 4);
    const startYear = this.startDate.substring(4, 8);

    // Create a new Date object using the parts
    // Note: Subtracted 1 since month index is 0-indexed in Date constructor
    if (Date.toString() === "Invalid Date") {
      return next(
        new Error(`Invalid date provided for startDate: ${this.startDate}!`)
      );
    }

    //Assign the correctly formatted string (MM/DD/YYYY) back to the schema field
    this.startDate = `${startMonth}/${startDay}/${startYear}`;
  }
  next();
});

// Use a 'pre-save' hook to format the date
tripSchema.pre("save", function (next) {
  // END DATE
  if (this.isModified("endDate") && this.endDate.length === 8) {
    // Extracting parts from the MMDDYYYY string
    const endMonth = this.endDate.substring(0, 2);
    const endDay = this.endDate.substring(2, 4);
    const endYear = this.endDate.substring(4, 8);

    // Create a new Date object using the parts
    // Note: Subtracted 1 since month index is 0-indexed in Date constructor
    if (Date.toString() === "Invalid Date") {
      return next(
        new Error(`Invalid date provided for endDate: ${this.endDate}!`)
      );
    }

    //Assign the correctly formatted string (MM/DD/YYYY) back to the schema field
    this.endDate = `${endMonth}/${endDay}/${endYear}`;
  }
  next();
});

module.exports = mongoose.model("trip", tripSchema);
