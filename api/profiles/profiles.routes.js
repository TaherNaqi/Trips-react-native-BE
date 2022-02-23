const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const passport = require("passport");
const {
  createTrip,
  getProfiles,
  fetchProfile,
  updateProfile,
} = require("./profiles.controllers");

// router.get("/", fetchProfile);
router.get("/", getProfiles);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createTrip
);
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateProfile
);
module.exports = router;
