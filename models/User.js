const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: { type: String, required: true, min: 5, max: 30 },
  email: { type: String, required: true, min: 5, max: 30 },
  password: { type: String, required: true, min: 5, max: 20 },
  // street: { type: String, max: 50 },
  // number: { type: Number, required: true },
  // complement: { type: String, min: 0, max: 50 },
  // neighborhood: { type: String, min: 5, max: 50 },
  // city: { type: String, required: true, min: 5, max: 50 },
  // zipCode: { type: Number, required: true }
  phone: { type: Number, required: true, min: 10 },
  address: { type: Schema.Types.Mixed, required: true, min: 30 }
});

userSchema.pre("save", async function(next) {
  let user = this;
  if (!user.isModified("password")) return next();

  user.password = await bcrypt.hash(user.password, 10);
  return next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
