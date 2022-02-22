//call models and other files:
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const { JWT_EXPIRATION, JWT_SECRET } = require("../../config/keys");
//call libraries:
const bcrypt = require("bcrypt");
const jsonweb = require("jsonwebtoken");

//generate token:
const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION,
  };

  const token = jsonweb.sign(payload, JWT_SECRET);
  return token;
};

//signup function:
exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;

    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    const profile = await Profile.create({
      owner: newUser._id,
      bio: req.body.bio,
      image: req.body.image,
    });
    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

//signin function:
exports.signin = (req, res, next) => {
  const token = generateToken(req.user);
  res.json({ token });
};
