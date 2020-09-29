const router = require("express").Router();
const auth = require("../middleware/auth");
const Meal = require("../models/MealModel");

router.post("/", auth, async (req, res) => {
  try {
    const { title, description, calories } = req.body;

    // validation

    if (!title)
      return res
        .status(400)
        .json({ msg: "No food entered. Please enter a food" });
    if (!description)
      return res
        .status(400)
        .json({ msg: "please enter a short description of the food" });
    if (!calories)
      return res
        .status(400)
        .json({ msg: "Please enter total calories for food" });

    const newFood = new Meal({
      title,
      description,
      calories,
      userId: req.user
    });
    const savedFood = await newFood.save();
    res.json(savedFood);
  } catch (err) {
    res.status(500).json({ error: err.msg });
  }
});

router.get("/all", auth, async (req, res) => {
  const foods = await Meal.find({ userId: req.user });
  res.json(foods);
});

router.delete("/:id", auth, async (req, res) => {
  const food = await Meal.findOne({ userId: req.user, _id: req.params.id });
  if (!food)
    return res.status(400).json({
      msg: "No food found with this ID that belongs to the current user."
    });
  const deletedFood = await food.findByIdAndDelete(req.params.id);
  res.json(deletedFood);
});

module.exports = router;
