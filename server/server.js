const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config(); // environment variable config file

//express set up
const app = express(); // creates express server
const port = process.env.PORT || 5000; //finds if not then use local port

//Mongoose connection
const uri = process.env.ATLAS_URI; // retrieve uri from env(environment file) which is pulled from mongoDB(MongoDB Address of database)
mongoose.connect(uri, {
  // connect to mongoDB via mongoose
  useNewUrlParser: true, // clear node depreciation errors
  useCreateIndex: true, // clear node depreciation errors
  useUnifiedTopology: true // clear node depreciation errors
});
const connection = mongoose.connection; // Once connected via mongoose, log connnection to console
connection.once("open", () => {
  console.log("MongoDB database connection established.");
});

//middleware
app.use(cors()); //allow cors
app.use(express.json()); //allow json parsing
//routes
app.use("/users", require("./routes/userRouter"));
app.use("/list", require("./routes/ListRouter"));

app.listen(port, () => {
  // listen on port for server
  console.log(`server is running on port:${port}`);
});
