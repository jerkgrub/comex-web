const mongoose = require("mongoose");

const AttendeeSchema = new mongoose.Schema({
  at_email: {
    type: String,
  },
  at_fname: {
    type: String,
  },
  at_lname: {
    type: String,
  },
  at_mnum: {
    type: String,
  },
});

const ActivitySchema = new mongoose.Schema({
  activity_title: {
    type: String,
  },
  activity_organizer: {
    type: String,
  },
  activity_description: {
    type: String,
  },
  activity_image: {
    type: String,
  },
  activity_date: {
    type: Date,
  },
  activity_time: {
    type: String,
  },
  activity_dep: {
    type: String,
  },
  attendees: [AttendeeSchema],
});

const Activity = mongoose.model("Activity", ActivitySchema);
module.exports = Activity;
