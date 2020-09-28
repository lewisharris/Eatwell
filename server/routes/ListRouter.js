const router = require("express").Router();
const auth = require("../middleware/auth");
const Item = require("../models/ListItemModel");

router.post("/", auth, async (res, req) => {
  try {
    const [title, description] = res.body;

    //validation
    if (title) {
      res.status(400).json({ msg: "No title for task. Please enter a title" });
    }
    if (title) {
      res
        .status(400)
        .json({ msg: "No description for task. Please enter a description" });
    }
    const NewItem = new Item({
      title,
      description,
      userId: auth.user
    });

    const savedItem = await NewItem.save();

    res.json(savedItem);
  } catch (err) {}
});

module.exports = Router;
