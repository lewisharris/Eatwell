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

// create user details
router.get("/update/:id", auth, async (req, res) => {
  try {
    const stats = await UserStats.findOne({ userId: req.params.id }).then(
      () => {
        console.log(stats);
        //   const { userId, height, weight, targetCalories } = req.body;
        //   stats.userId = userId;
        //   stats.height = height;
        //   stats.weight = weight;
        //   stats.targetCalories = targetCalories;

        //   user
        //     .save()
        //     .then(() => {
        //       res.json({ msg: "user updated" });
        //     })
        //     .catch(err => res.status(500).json({ msg: err.msg }));
      }
    );
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
});

// router.delete("/:id", auth, async (req, res) => {
//     try {
//       if (!food)
//         return res.status(400).json({
//           msg: "No food found with this ID that belongs to the current user."
//         });
//       const deletedFood = await Meal.findByIdAndDelete(req.params.id);
//       res.json(deletedFood);
//     } catch (err) {
//       res.status(500).json({ error: err.msg });
//     }
//   });

// var query = {'username': req.user.username};
// req.newData.username = req.user.username;

// MyModel.findOneAndUpdate(query, req.newData, {upsert: true}, function(err, doc) {
//     if (err) return res.send(500, {error: err});
//     return res.send('Succesfully saved.');
// });

module.exports = router;
