const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  is_archived: Boolean,
  password: String,
  u_fname: String,
  u_mname: String,
  u_lname: String,
  u_dep: String,
  u_datehired: String,

  usertype: {
    type: String,
    enum: ["student", "admin", "teacher", "asp", "ntp"], //different types
  },

  u_mnum: {
    type: String,
    unique: true,
  },

  u_studnum: {
    //for student
    type: String,
    unique: true,
  },

  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return v.endsWith("nu-moa.edu.ph");
      },
      message: (props) =>
        `${props.value} is not a valid email. It should end with '@nu-moa.edu.ph'`,
    },
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

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, usertype: this.usertype },
    "COMEX2024",
    { expiresIn: "1h" } // Token expires in 1 hour
  );
  return token;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
