const express = require("express");
const router = express.Router();
const { getPrivateData, editDetails } = require("../controllers/private");
const { protect } = require("../middleware/auth");

router.route("/").get(protect, getPrivateData);

router.route("/editdetail/:id").post(protect, editDetails);

module.exports = router;
