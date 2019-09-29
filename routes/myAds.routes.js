const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});

router.get("/auth/myAds", (req, res, next) => {
  return res.render("auth/myAds");
});

router.post("/auth/myAds", async (req, res, next) => {
  const { title, school, photo, description } = req.body;
  console.log(title, school, photo, description);

  if (!title || !school)
    return res.render("error", { errorMessage: `Dados insuficinetes!` });

  req.body.userID = req.session.currentUser._id;

  try {
    const adsCreate = await Product.create(req.body);
    return res.redirect("/");
  } catch (err) {
    return res.render("error", {
      errorMessage: `Erro ao criar Anuncio: ${err}`
    });
  }
});

module.exports = router;
