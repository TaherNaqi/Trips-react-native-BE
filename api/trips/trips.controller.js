const res = require("express/lib/response");
const Trip = require("../../models/Trip");

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findById(tripId);
    return trip;
  } catch (error) {
    next(error);
  }
};
exports.getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    return res.json(trips);
  } catch (error) {
    next(error);
  }
};
exports.createTrip = async (req, res, next) => {
  try {
    // if (req.file)
    //   req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    // req.body.owner = { id: req.user._id, username: req.user.username };
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};
exports.updateTrip = async (req, res, next) => {
  try {
    if (!req.user._id.equals(req.trip.owner._id)) {
      next({ status: 401, message: "You are not the owner of the trip" });
    } else {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/${
          req.file.path
        }`;
      }
      const trip = await Trip.findByIdAndUpdate(
        { _id: req.trip.id, owner: req.trip.owner },
        req.body,
        { new: true, runValidators: true }
      );
      res.status(201).json(trip);
    }
  } catch (error) {
    next(error);
  }
};
