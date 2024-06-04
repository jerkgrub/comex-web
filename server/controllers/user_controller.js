const User = require("../models/user_model");
const bcrypt = require("bcryptjs");

// CREATE
const newAcc = (req, res) => {
  User.create(req.body)
    .then((newAcc) => {
      res.json({ newAcc: newAcc, status: "successfully inserted" });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

// GET ALL
const findAllUser = (req, res) => {
  User.find()
    .then((allDaUser) => {
      res.json({ Users: allDaUser });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

// Find by ID
const findOneUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.json({ User: user });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong", error: err });
    });
};

// DELETE
const deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
      .then((deletedUser) => {
          if (deletedUser) {
              res.json({ message: 'User successfully deleted', deletedUser })
          } else {
              res.status(404).json({ message: 'User not found' })
          }
      })
      .catch((err) => {
          res.status(500).json({ message: 'Something went wrong', error: err })
      });
}

// auth
const login = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user === null) {
        res.json({ message: "invalid login attempt" });
      } else {
        const correctPassword = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (correctPassword) {
          if (user.usertype === "admin") {
            res.json({ message: "Successfully logged in as admin" });
          } else if (user.usertype === "student") {
            res.json({ message: "Successfully logged in as student" });
          } else {
            res.json({ message: "Role not recognized" });
          }
        } else {
          res.json({ message: "invalid login attempt" });
        }
      }
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

module.exports = {
  // CRUD

  newAcc, //create

  findAllUser, //read
  findOneUser, //read
  
  deleteUser, //delete

  // AUTH
  login,
};
