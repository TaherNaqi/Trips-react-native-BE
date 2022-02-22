//call libraries:
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
//call models and files:
const User = require("../models/User");
const { JWT_SECRET } = require("../config/keys");

//local Strtegy functionality:
exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    const checkpassword = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (checkpassword) done(null, user);
    else done(null, false);
  } catch (error) {
    done(error);
  }
});

//json web token strategy:
exports.jwtStrtegy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) done(null, false);
    try {
      const user = await User.findById(jwtPayload._id);
      if (user) done(null, user);
      else done(null, false);
    } catch (error) {
      done(null, false);
    }
  }
);
