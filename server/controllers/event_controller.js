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

// 3. Update
const updateEvent = (req, res) => {
  Event.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedEvent) => {
      res.json({
        updatedEvent: updatedEvent,
        status: "successfully Updated the Event",
      });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
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

// ATTENDEES SECTION //////////////////////////////////////////////////////////////////////////////////

// Create
// Create
const addAttendee = (req, res) => {
  const eventId = req.params.id;
  const newAttendee = req.body; // Expecting { at_email: "email", at_fname: "fname", at_lname: "lname", at_mnum: "mnum" }

  Event.findById(eventId)
    .then((event) => {
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      // Check if the attendee with the provided email already exists
      const existingAttendee = event.attendees.find(
        (attendee) => attendee.at_email === newAttendee.at_email
      );
      if (existingAttendee) {
        return res
          .status(400)
          .json({ message: "Attendee with the same email already exists" });
      }

      // Add the new attendee
      event.attendees.push(newAttendee);
      return event.save();
    })
    .then((updatedEvent) => {
      res.json({
        updatedEvent: updatedEvent,
        status: "Attendee added successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong", error: err });
    });
};

// Read
// all attendees
const getAllAttendees = (req, res) => {
  Event.findById(req.params.id)
    .then((event) => {
      if (event) {
        res.json({ attendees: event.attendees });
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong", error: err });
    });
};

// Delete
const deleteAttendee = (req, res) => {
  const eventId = req.params.eventId;
  const attendeeEmail = req.params.email;

  Event.findById(eventId)
    .then((event) => {
      if (event) {
        event.attendees = event.attendees.filter(
          (attendee) => attendee.at_email !== attendeeEmail
        );
        return event.save();
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    })
    .then((updatedEvent) => {
      res.json({
        updatedEvent: updatedEvent,
        status: "Attendee deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong", error: err });
    });
};

module.exports = {
  // events
  newEvent,
  findAllEvent,
  findOneEvent,
  updateEvent,
  deleteEvent,

  // attendees
  addAttendee,
  getAllAttendees,
  deleteAttendee,
};
