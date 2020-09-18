const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  let { email, password, passwordCheck, username } = req.body;
  try {
    //validation - check required fields are filled out
    if (!email || !password || !passwordCheck)
      //check all required fields have been entered
      return res.status(400).json({ msg: "Not all fields are entered" });
    if (password.length < 5)
      //check password length is above minimum
      return res
        .status(400)
        .json({ msg: "Password must be at least 5 characters" });
    if (password !== passwordCheck)
      return res.status(400).json({ msg: "Passwords do not match" });
    const existingUser = await User.findOne({ email: email }); //mongoose will search database for email field with email same as email in request body
    if (existingUser)
      // check if existing user already exists
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });
    if (!username) username = email;
    const salt = await bcrypt.genSalt(); // hash value
    const passwordHash = await bcrypt.hash(password, salt); // generate hashed password
    const newUser = new User({ email, password: passwordHash, username });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
