const express = require("express");
const uploadCloud = require("../public/images/cloudinary/cloudinary");
const Product = require("../models/product");
const router = express.Router();

const serchAds = async (req, res) => {
  const regex = new RegExp(escapeRegex(req.query.search), "gi");
  const allAds = await Product.find({ title: regex });
  if (allAds === undefined) {
    allAds = "Nenhum resultado encontrado para sua busca!";
  }
  res.render("allAds", { allAds });
};

router.get("/", serchAds);

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

const searchAllAds = async (req, res) => {
  try {
    const allAds = await Product.find({ status: { $eq: "Disponivel" } });
    return res.render("allAds", { allAds });
  } catch (err) {
    return res.render("allAds", `errorMessage: ${err}!`);
  }
};

router.get("/all", searchAllAds);

module.exports = router;
