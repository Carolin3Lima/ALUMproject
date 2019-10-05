const express = require("express");
const Product = require("../models/product");
const router = express.Router();

const searchAllAds = async (req, res) => {
  try {
    const allAds = await Product.find({});
    return res.render("home", { allAds });
  } catch (err) {
    return res.render("error", { errorMessage: `Erro: ${err}!` });
  }
};

router.get("/", searchAllAds);

module.exports = router;

