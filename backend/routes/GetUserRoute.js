const express = require("express");
const { getAllUser, postAllUser } = require("../controllers/AllUsers");
const router = express.Router();

router.get("/all-users", getAllUser);
router.post("/all-users", postAllUser);

module.exports = router;
