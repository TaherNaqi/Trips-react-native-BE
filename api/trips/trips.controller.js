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
    const trips = await Trip.find().populate("owner");
    return res.json(trips);
  } catch (error) {
    next(error);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    // if (!req.user._id.equals(req.trip.owner._id)) {
    //   next({ status: 401, message: "You are not the owner of the trip" });
    // } else {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
    }
    const trip = await Trip.findByIdAndUpdate(
      { _id: req.trip.id, owner: req.trip.owner },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
};
exports.deleteTrip = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const foundTrip = await Trip.findByIdAndDelete({ _id: tripId });
    if (foundTrip) res.status(204).end();
  } catch (error) {
    next(error);
  }
};
