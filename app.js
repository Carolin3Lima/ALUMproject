require("dotenv").config();

const express = require("express");
const app = express();

// const morgan = require("morgan");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const path = require("path");

const mongoose = require("mongoose");

const session = require("express-session");
const mongoStore = require("connect-mongo")(session);

const url = process.env.servermongoAtlas;
const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 5,
  reconnectInterval: 500,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(url, options);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connection.on("error", err => {
  console.log(`Error connecting to database: ${err}`);
});
mongoose.connection.on("disconnected", () => {
  console.log(`Application disconnected from database`);
});
mongoose.connection.on("connected", () => {
  console.log(`Application connected to the database!`);
});

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(morgan("dev"));

app.use(
  session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 600000 },
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    }),
    proxy: true,
    resave: true,
    saveUninitialized: true
  })
);

const homeRoute = require("./routes/home.routes");
app.use("/", homeRoute);

const userRoute = require("./routes/user.routes");
app.use("/user", userRoute);

const loginRoute = require("./routes/login.routes");
app.use("/login", loginRoute);

const myAdsRoute = require("./routes/myAds.routes");
app.use("/ads", myAdsRoute);

const allAdsRoute = require("./routes/allAds.routes");
app.use("/ads", allAdsRoute);

app.listen(process.env.PORT, () => {
  console.log("Application successfully connected to port 3000!");
});

hbs.registerPartials(`${__dirname}/views/partials`);

module.exports = app;
