const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

router.get("/", (req, res, next) => {
  return res.render("login");
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.render("login", {
        MessageEvent: `Digite login e senha!`
      });

    const user = await User.findOne({ email }); //.select("+password");
    if (!user)
      return res.render("login", {
        MessageEvent: `Usuário ou senha inexistente!`
      });

    const pass_ok = await bcrypt.compareSync(password, user.password);
    if (!pass_ok)
      return res.render("login", {
        MessageEvent: `Erro ao autenticar usuário!`
      });

    req.session.currentUser = user;
    res.redirect("/ads/auth/myAds");

    return;
  } catch (err) {
    return res.render("error", { errorMessage: `Erro: ${err}!` });
  }
});

module.exports = router;
