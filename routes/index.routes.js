const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  return res.render("index");
});

module.exports = router;
