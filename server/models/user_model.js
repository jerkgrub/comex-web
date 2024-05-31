const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({

  fname: {
    type: String,
    required: true,
    unique: true
  },
  lname: {
    type: String,
    required: true,
    unique: true
  },
  mnumber: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  usertype: {
    type: String,
    enum: ['client', 'admin', ],
    required: true
  }
});

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

UserSchema.pre('save', function(next) {
  this.usertype = this.usertype.toLowerCase();
  next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;