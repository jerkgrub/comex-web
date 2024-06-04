const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  usertype: {
    type: String,
    enum: ["student", "admin", "faculty"], //different types
    required: true,
  },
  u_fname: {
    type: String,
    required: true,
    unique: true,
  },
  u_mname: {
    type: String,
    required: true,
    unique: true,
  },
  u_lname: {
    type: String,
    required: true,
    unique: true,
  },
  u_email: {
    type: String,
    required: true,
    unique: true,
  },
  u_mnum: {
    type: String,
    required: true,
    unique: true,
  },
  u_dep: {
    type: String,
    required: true,
    unique: true,
  },
  u_studid: {
    type: String,
    required: true,
    unique: true,
  },


  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

UserSchema.pre("save", function (next) {
  this.usertype = this.usertype.toLowerCase();
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
