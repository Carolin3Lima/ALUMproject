const express = require("express");
const uploadCloud = require("../public/images/cloudinary/cloudinary");
const Product = require("../models/product");
const router = express.Router();

const searchAds = async (req, res) => {
  console.log("Rota Search", req.query);
  try {
    const filterAds = await Product.find({
      product: { $eq: req.query.product }
    });
    return res.render("searchAds", { filterAds });
  } catch (err) {
    return res.render("error", { errorMessage: `Erro: ${err}!` });
  }
};

router.get("/", searchAds);

module.exports = router;
