const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/auth/login");
  }
});

router.get("/auth/myAds", (req, res, next) => {
  return res.render("auth/myAds");
});

router.post("/auth/myAds", async (req, res, next) => {
  const { title, school, photo, description } = req.body;

  if (!title || !school)
    return res.render("error", { errorMessage: `Dados insuficinetes!` });

  try {
    const adsCreate = await Product.create(req.body);
    console.log(adsCreate);
    return res.redirect("/auth/myAds");
  } catch (err) {
    return res.render("error", {
      errorMessage: `Erro ao criar Anuncio: ${err}`
    });
  }
});

module.exports = router;
