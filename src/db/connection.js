/* eslint-disable no-console */
const mongoose = require("mongoose");

const urlDev = process.env.MONGODB_DEV_URL;
const urlTest = process.env.MONGODB_TEST_URL;

let url = urlDev;
if (process.env.NODE_ENV === "test") url = urlTest;

const connectToMongo = () => {
  mongoose.connect(url, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Database connected", url);
  });

  db.on("error", (err) => {
    console.error("Database connection error: ", err);
  });
};

module.exports = connectToMongo;
