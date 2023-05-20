const express = require("express");
const router = express.Router();
const getCSV = require("../controllers/getCSV")


router.get("/get-csv", getCSV);

module.exports = router;