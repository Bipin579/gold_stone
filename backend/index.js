const express = require("express");
const { connectMongoose } = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const getUser = require("./routes/GetUserRoute");
const editUser = require("./routes/EditRoute");
const csvRoute = require("./routes/getCSV");

const app = express();

// Connect to the database
connectMongoose();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v2/user", getUser);
app.use("/api/v2/user", editUser);
app.use("/api/v2/user", csvRoute);
// default

app.get("/", (req, res) => {
  res.send("Welcome");
});
// app.use('/availability', require('./app/routes/availabilityRoutes'));
// app.use('/schedule', require('./app/routes/scheduleRoutes'));

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
