const Event = require("../models/event_model");

// 1. Create
const newEvent = (req, res) => {
  try {
    Event.create(req.body)
      .then((newEvent) => {
        res.send({ newEvent: newEvent, status: "successfully inserted" });
      })
      .catch((err) => {
        res.send({ message: "Something went wrong", error: err });
      });
  } catch (error) {
    res.send(error);
  }
};

// 2. Read
const findAllEvent = (req, res) => {
  Event.find()
    .then((allDaEvent) => {
      res.json({ Events: allDaEvent });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};
// FIND BY ID
const findOneEvent = (req, res) => {
  Event.findById(req.params.id)
    .then((Event) => {
      if (Event) {
        res.json({ Event: Event });
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong", error: err });
    });
};

// 4. Delete
const deleteEvent = (req, res) => {
  Event.findOneAndDelete({ _id: req.params.id })
    .then((deletedEvent) => {
      if (deletedEvent) {
        res.json({ message: "Event successfully deleted", deletedEvent });
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong", error: err });
    });
};

module.exports = {
  newEvent,
  findAllEvent,
  findOneEvent,
  deleteEvent,
};
