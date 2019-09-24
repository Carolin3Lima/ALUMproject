require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const hbs = require("hbs");
const bodyParser = require("body-parser");
const path = require("path");

const session = require("express-session");
const mongoStore = require("connect-mongo")(session);

const url =
  "mongodb+srv://IsmaCardoso:Ism@1512@clusterapicurso-35etc.mongodb.net/test?retryWrites=true&w=majority";
const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 5,
  reconnectInterval: 500,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(url, options);
mongoose.set("useCreateIndex", true);

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

const indexRoute = require("./routes/index.routes");
app.use("/", indexRoute);

const createRoute = require("./routes/create.routes");
app.use("/", createRoute);

const loginRoute = require("./routes/login.routes");
app.use("/", loginRoute);

const myAdsnRoute = require("./routes/myAds.routes");
app.use("/", myAdsnRoute);

app.listen(process.env.PORT, () => {
  console.log("Application successfully connected to port 3000!");
});

module.exports = app;
