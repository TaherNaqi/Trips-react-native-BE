const express = require("express");
const connectDb = require("./database");
const cors = require("cors");
const path = require("path");
const tripRoutes = require("./api/trips/trips.routes");
const app = express();
connectDb();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method}://${req.get("host")}${req.originalUrl}`);
  next();
});
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/api/trips", tripRoutes);
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
