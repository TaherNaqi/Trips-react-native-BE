//libraries and middleware files call :
const { localStrategy, jwtStrtegy } = require("./middleware/passport");
const express = require("express");
const connectDb = require("./database");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");
const userRoutes = require("./api/users/users.routes");
const profileRoutes = require("./api/profiles/profiles.routes");
const tripRoutes = require("./api/trips/trips.routes");
const app = express();
connectDb();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method}://${req.get("host")}${req.originalUrl}`);
  next();
});

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrtegy);
app.use(morgan("dev"));
//routes:
app.use("/api", userRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/api/trips", tripRoutes);
app.use("/api/profiles", profileRoutes);
// Middleware
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Passport
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
