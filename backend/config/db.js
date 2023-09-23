const mongoose = require("mongoose");
require("dotenv").config();


// database connection

exports.connectMongoose = () => {
  mongoose
    .connect('mongodb://172.17.0.1:27017/app')
    .then((e) => {
      console.log(`Connected to mongoDB: ${e.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
