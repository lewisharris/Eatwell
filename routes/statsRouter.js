const router = require("express").Router();
const UserStats = require("../models/userStatsModel");
const auth = require("../middleware/auth");

// Routing for adding and updating personal details that are tied to a user ID.

// get user details of current user if they exist
// find user by ID, json the result
router.get("/:id", auth, async (req, res) => {
  try {
    const stats = await UserStats.find({ userId: req.user });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
});

// add new use

// update user details
router.put("/update/:id", auth, async (req, res) => {
  try {
    await UserStats.findOneAndUpdate(
      { userId: req.params.id },
      {
        userId: req.params.id,
        height: req.body.height,
        $push: { weight: req.body.weight },
        targetCalories: req.body.targetCalories
      },
      { new: true, upsert: true, useFindAndModify: false }
    )
      .then(res => {
        console.log(res);
      })
      .then(res.json("updated"))
      .catch(err => console.log(err));
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
});

module.exports = router;
