const Trip = require("../../models/Trip");
const Profile = require("../../models/Profile");
exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findById(profileId);
    return profile;
  } catch (error) {
    next(error);
  }
};
exports.getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate({
      path: "trips",
      populate: { path: "owner" },
    });
    return res.json(profiles);
  } catch (error) {
    next(error);
  }
};
exports.createTrip = async (req, res, next) => {
  try {
    req.body.profile = req.params.profileId;
    if (req.user._id.equals(req.body.profile)) {
      return next({
        status: 401,
        message: "You're not the owner!!!",
      });
    }
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    req.body.owner = { _id: req.user._id, username: req.user.username };
    console.log(req.body.owner);
    const newTrip = await Trip.create(req.body);
    await Profile.findOneAndUpdate(
      { _id: req.params.profileId },
      { $push: { trips: newTrip._id } }
    );
    res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};
