const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/main");

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/paper_plane_db")
  .then(() => {
    console.log("Connected to DB.");
  })
  .catch(console.error());

const app = express();

// JSON parsing middleware
app.use(express.json());

app.use(cors());

app.use("/", mainRouter);

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
});
