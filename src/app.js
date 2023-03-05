const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const connectToMongo = require("./db/connection");

const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//set the api call routes
app.use("/api/", todoRoutes);

//configuration for deploying app, getting the data from client

app.get("*", function (req, res) {
  const index = path.join(__dirname, "build", "index.html");
  res.sendFile(index);
});

//connect to port and mongodb

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  connectToMongo();
});

module.exports = app;
