const Activity = require("../models/Activity_model");

// 1. Create
const newActivity = (req, res) => {
  try {
    Activity.create(req.body)
      .then((newActivity) => {
        res.send({ newActivity: newActivity, status: "successfully inserted" });
      })
      .catch((err) => {
        res.send({ message: "Something went wrong", error: err });
      });
  } catch (error) {
    res.send(error);
  }
};

// 2. Read
const findAllActivity = (req, res) => {
  Activity.find()
    .then((allDaActivity) => {
      res.json({ Activities: allDaActivity });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};
// FIND BY ID
const findOneActivity = (req, res) => {
  Activity.findById(req.params.id)
    .then((Activity) => {
      if (Activity) {
        res.json({ Activity: Activity });
      } else {
        res.status(404).json({ message: "Activity not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong", error: err });
    });
};

// 3. Update
const updateActivity = (req, res) => {
  Activity.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedActivity) => {
      res.json({
        updatedActivity: updatedActivity,
        status: "successfully Updated the Activity",
      });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

// 4. Delete
const deleteActivity = (req, res) => {
  Activity.findOneAndDelete({ _id: req.params.id })
    .then((deletedActivity) => {
      if (deletedActivity) {
        res.json({ message: "Activity successfully deleted", deletedActivity });
      } else {
        res.status(404).json({ message: "Activity not found" });
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
  const ActivityId = req.params.id;
  const newAttendee = req.body; // Expecting { at_email: "email", at_fname: "fname", at_lname: "lname", at_mnum: "mnum" }

  Activity.findById(ActivityId)
    .then((Activity) => {
      if (!Activity) {
        return res.status(404).json({ message: "Activity not found" });
      }

      // Check if the attendee with the provided email already exists
      const existingAttendee = Activity.attendees.find(
        (attendee) => attendee.at_email === newAttendee.at_email
      );
      if (existingAttendee) {
        return res
          .status(400)
          .json({ message: "Attendee with the same email already exists" });
      }

      // Add the new attendee
      Activity.attendees.push(newAttendee);
      return Activity.save();
    })
    .then((updatedActivity) => {
      res.json({
        updatedActivity: updatedActivity,
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
  Activity.findById(req.params.id)
    .then((Activity) => {
      if (Activity) {
        res.json({ attendees: Activity.attendees });
      } else {
        res.status(404).json({ message: "Activity not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong", error: err });
    });
};

// Delete
const deleteAttendee = (req, res) => {
  const ActivityId = req.params.ActivityId;
  const attendeeEmail = req.params.email;

  Activity.findById(ActivityId)
    .then((Activity) => {
      if (Activity) {
        Activity.attendees = Activity.attendees.filter(
          (attendee) => attendee.at_email !== attendeeEmail
        );
        return Activity.save();
      } else {
        res.status(404).json({ message: "Activity not found" });
      }
    })
    .then((updatedActivity) => {
      res.json({
        updatedActivity: updatedActivity,
        status: "Attendee deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong", error: err });
    });
};

module.exports = {
  // Activities
  newActivity,
  findAllActivity,
  findOneActivity,
  updateActivity,
  deleteActivity,

  // attendees
  addAttendee,
  getAllAttendees,
  deleteAttendee,
};
