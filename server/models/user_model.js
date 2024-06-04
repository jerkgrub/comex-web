const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  usertype: {
    type: String,
    enum: ["student", "admin", "teacher", "asp", "ntp"], //different types
    required: true,
  },
  u_fname: {
    type: String,
    required: true,
  },
  u_mname: {
    type: String,
    required: true,
  },
  u_lname: {
    type: String,
    required: true,
  },
  u_mnum: {
    type: String,
    required: true,
    unique: true,
  },
  u_dep: {
    type: String,
    required: true,
  },
  u_studnum: { //for student
    type: String,
    required: true,
    unique: true,
  },
  u_datehired: { //for non-student
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return v.endsWith('nu-moa.edu.ph');
      },
      message: props => `${props.value} is not a valid email. It should end with '@nu-moa.edu.ph'`
    },
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

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, usertype: this.usertype },
    'COMEX2024',
    { expiresIn: '1h' }  // Token expires in 1 hour
  );
  return token;
}

const User = mongoose.model("User", UserSchema);
module.exports = User;
