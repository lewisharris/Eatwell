const router = require("express").Router();
const auth = require("../middleware/auth");
const axios = require("axios");
require("dotenv").config(); // environment variable config file

//Router to edamam api
router.get("/foodsearch", async (req, res) => {
  const query = req.query.search;
  const APP_ID = process.env.APP_ID;
  const APP_KEY = process.env.APP_KEY;
  const URL = `https://api.edamam.com/api/food-database/v2/parser?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${query}&nutrition-type=cooking`;
  await axios
    .get(URL)

    .then(response => {
      return response.data;
    })
    .then(data => res.json(data))
    .catch(err => console.log(err));
  // .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
