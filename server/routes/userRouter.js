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
    res.status(500).json({ error: err.msg });
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
      user: {
        id: user._id,
        username: user.username,
        height: user.height,
        weight: user.weight,
        targetCalories: user.targetCalories
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.msg });
  }
});

//delete account route
router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    console.log(deletedUser);
    res.json(deletedUser);
  } catch (err) {}
});

//verify token route
router.post("/tokenisvalid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }
    const verified = JWT.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }
    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false);
    }
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.msg });
  }
});

//get logged in user route
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user); // find user
  res.json({ username: user.username, id: user._id });
});

//get logged in user route
router.get("/user/:id", auth, async (req, res) => {
  const user = await User.findById(req.params.id); // find user
  res.json(user);
});

//update user route
router.post("/update/:id", auth, async (req, res) => {
  User.findById(req.params.id).then(user => {
    user.username = req.body.username;
    user.height = req.body.height;
    user.weight = req.body.weight;
    user.targetCalories = req.body.targetCalories;

    user
      .save()
      .then(() => {
        res.json({ msg: "user updated" });
      })
      .catch(err => res.status(500).json({ msg: err.msg }));
  });
});

module.exports = router;
