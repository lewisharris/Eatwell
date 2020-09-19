const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const auth = require("../middleware/auth");

//register new user route
router.post("/register", async (req, res) => {
  let { email, password, passwordCheck, username } = req.body;
  try {
    //validation - check required fields are filled out
    if (!email || !password || !passwordCheck) {
      //check all required fields have been entered
      return res.status(400).json({ msg: "Not all fields are entered" });
    }
    if (password.length < 5) {
      //check password length is above minimum
      return res
        .status(400)
        .json({ msg: "Password must be at least 5 characters" });
    }
    if (password !== passwordCheck) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
    const existingUser = await User.findOne({ email: email });
    //mongoose will search database for email field with email same as email in request body
    if (existingUser) {
      // check if existing user already exists
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });
    }
    if (!username) {
      username = email;
    }
    //password hashing
    const salt = await bcrypt.genSalt(); // hash value
    const passwordHash = await bcrypt.hash(password, salt); // generate hashed password
    //create new user
    const newUser = new User({ email, password: passwordHash, username });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation - check all required fields have been entered
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields are entered" });
    }
    //look for user in database
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "no account with this email exists" });
    }
    //if user exists compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    //if password doesnt match return
    if (!isMatch) {
      return res.status(400).json({ msg: "invalid credentials" });
    }
    //if all credentials have passed validation then access new web token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete account route
router.delete("/delete", auth, async (res, req) => {
  console.log(req.user);
});

module.exports = router;
