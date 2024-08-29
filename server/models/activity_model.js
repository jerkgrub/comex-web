const mongoose = require("mongoose");

const AttendeeSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
});

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  organizer: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  department: {
    type: String,
  },
  attendees: [AttendeeSchema],
});

const Activity = mongoose.model("Activity", ActivitySchema);
module.exports = Activity;
