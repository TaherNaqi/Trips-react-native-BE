//call libraries:
const express = require("express");
const passport = require("passport");
//call controller file:
const { signup, signin } = require("./users.controllers");

const router = express.Router();

router.post(
  "/signup",
  // upload.single("image"),
  signup
);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),

  signin
);
//session: false  <=- should replace it with failuerRedirect incase note working

module.exports = router;
