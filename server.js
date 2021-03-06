// Basically already done for me
// below sets up dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

// port to listen on
const PORT = process.env.PORT || 3000;


const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Connect to the database - will need to update this for Heroku
// mongoose.connect("mongodb://localhost/budget", {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// });
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/budget',
  {
    useNewUrlParser: true,
    useFindAndModify: false
  },
);

// routes
app.use(require("./routes/api.js"));

// start listening, display port
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});