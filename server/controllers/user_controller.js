const User = require("../models/user_model");
const bcrypt = require("bcryptjs");


// 1. Create
const newAcc = (req, res) => {
  User.create(req.body)
    .then((newAcc) => {
      res.json({ newAcc: newAcc, status: "successfully inserted" });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

// 2. Read
const findAllUser = (req, res) => {
  User.find()
    .then((allDaUser) => {
      res.json({ Users: allDaUser });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};
// FIND BY ID
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

// 3. Update
const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id }, 
    req.body, 
    { new: true, runValidators: true }
  )
  .then((updatedUser) => {
    res.json({ updatedUser: updatedUser, status: "successfully Updated the User" });
  })
  .catch((err) => {
    res.json({ message: 'Something went wrong', error: err });
  });
}


// 4. Delete
const deleteUser = (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
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
          const token = user.generateAuthToken();
          if (user.usertype === "admin") {
            res.json({ message: "Successfully logged in as admin", token: token, user: { u_fname: user.u_fname, u_lname: user.u_lname, email: user.email } });
          } else if (user.usertype === "student") {
            res.json({ message: "Successfully logged in as student", token: token, user: { u_fname: user.u_fname, u_lname: user.u_lname, email: user.email } });
          } else {
            res.json({ message: "Role not recognized", token: token, user: { u_fname: user.u_fname, u_lname: user.u_lname, email: user.email } });
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

  updateUser, //update
  
  deleteUser, //delete

  // AUTH
  login,
};
