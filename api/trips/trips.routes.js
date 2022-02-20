const express = require("express");
const router = express.Router();
// const passport = require("passport");
const upload = require("../../middleware/multer");
const { getTrips, updateTrip, createTrip } = require("./trips.controller");
router.param("tripId", async (req, res, next, tripId) => {
  const foundTrip = await fetchTrip(tripId, next);
  if (foundTrip) {
    req.trip = foundTrip;
    next();
  } else next({ status: 404, message: "Trip not found" });
});
router.get("/", getTrips);
router.post("/", createTrip);
router.put("/:tripId", updateTrip);
module.exports = router;
