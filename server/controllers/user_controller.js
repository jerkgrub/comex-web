const User = require('../models/user_model');
const bcrypt = require('bcryptjs');

const newAcc = (req, res) => {
  User.create(req.body)
      .then((newAcc) => {
          res.json({ newAcc: newAcc,status:"successfully inserted" })
      })
      .catch((err) => {
          res.json({ message: 'Something went wrong', error: err })
      });
}

const login = (req, res) => {
  User.findOne({
    email: req.body.email
  })
  .then((user) => {
    if(user === null) {
      res.json({message: "invalid login attempt"})
    } else {
      const correctPassword = bcrypt.compareSync(req.body.password, user.password);
      if(correctPassword) {
        if(user.usertype === 'admin') {
          res.json({message: "Successfully logged in as admin"})
        } else if(user.usertype === 'client') {
          res.json({message: "Successfully logged in as client"})
        } else {
          res.json({message: "Role not recognized"})
        }
      } else {
        res.json({message: "invalid login attempt"})
      }
    }
  })
  .catch((err) => {
    res.json({ message: 'Something went wrong', error: err })
  });
}

module.exports = {
  newAcc,
  login
}