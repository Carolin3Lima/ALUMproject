const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

router.get("/", (req, res, next) => {
  res.render("user");
});

router.post("/", async (req, res, next) => {
  const { name, email, password, password2 } = req.body;

  if (!name || !email || !password || !password2)
    return res.render("user", { errorMessage: `Dados insuficientes!` });

  if (password !== password2)
    return res.render("user", { errorMessage: `As senhas devem ser iguais!` });

  if (await User.findOne({ email }))
    return res.render("user", {
      errorMessage: `Usuário já cadastrado!`
    });

  try {
    const userCreate = await User.create(req.body);
    userCreate.password = undefined;
    console.log("user", userCreate);
    return res.redirect("/login");
  } catch (err) {
    return res.render("error", {
      errorMessage: `Erro ao criar Usuário: ${err}`
    });
  }
});

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});

router.get("/auth/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

router.get("/auth/userEdit", async (req, res, next) => {
  const user = await User.findById(req.session.currentUser._id);
  return res.render("auth/userEdit", user);
});

router.post("/auth/userEdit", async (req, res, next) => {
  try {
    const userEdited = await User.findByIdAndUpdate(req.query.id, req.body);
    console.log(req.body);
    return res.redirect("/ads/auth/myAds");
  } catch (err) {
    return res.render("userEdit", {
      errorMessage: `Erro ao editar Anuncio: ${err}`
    });
  }
});

module.exports = router;
