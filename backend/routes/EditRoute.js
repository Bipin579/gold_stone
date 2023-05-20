const express = require("express");
const editUser = require("../controllers/Edit");
const router = express.Router();


router.patch("/edit-user/:id", editUser);

module.exports = router;
