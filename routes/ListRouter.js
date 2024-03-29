const router = require("express").Router();
const auth = require("../middleware/auth");
const Meal = require("../models/MealModel");

// Add item to list
router.post("/", auth, async (req, res) => {
  try {
    const { title, mealType, calories } = req.body;

    // validation
    if (!title) return res.status(400).json({ msg: "No food entered." });
    if (!mealType)
      return res
        .status(400)
        .json({ msg: "please select when you ate this food" });
    if (!calories)
      return res
        .status(400)
        .json({ msg: "Please enter total calories for food" });

    const newFood = new Meal({
      title,
      mealType,
      calories,
      userId: req.user
    });
    console.log(newFood);
    const savedFood = await newFood.save();
    res.json(savedFood);
  } catch (err) {
    res.status(500).json({ error: err.msg });
  }
});

//find item in list and update it
router.put("/update/:id", auth, async (req, res) => {
  try {
    await Meal.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        mealType: req.body.mealType,
        calories: req.body.calories
      },
      { upsert: false, useFindAndModify: false }
    )
      .then(res => {
        console.log(res);
      })
      .then(res.json("updated"));
  } catch (err) {
    res.status(500).json({ error: err.msg });
  }
});

//get all items in list that match user id
router.get("/all", auth, async (req, res) => {
  const foods = await Meal.find({ userId: req.user });
  res.json(foods);
  console.log(foods);
});

// delete items from list with item id
router.delete("/:id", auth, async (req, res) => {
  try {
    const food = await Meal.findOne({ userId: req.user, _id: req.params.id });
    if (!food)
      return res.status(400).json({
        msg: "No food found with this ID that belongs to the current user."
      });
    const deletedFood = await Meal.findByIdAndDelete(req.params.id);
    res.json(deletedFood);
  } catch (err) {
    res.status(500).json({ error: err.msg });
  }
});

module.exports = router;
