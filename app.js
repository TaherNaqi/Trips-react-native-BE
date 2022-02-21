//libraries and middleware files call :
const { localStrategy, jwtStrtegy } = require("./middleware/passport");
const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

//routes:
const userRoutes = require("./api/users/users.routes");

//database:
const connectDB = require("./database");

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrtegy);

//routes:
app.use("/api", userRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
