const mongoose = require("mongoose");

const AttendeeSchema = new mongoose.Schema({
  at_email: {
    type: String,
    required: true,
  },
  at_fname: {
    type: String,
    required: true,
  },
  at_lname: {
    type: String,
    required: true,
  },
  at_mnum: {
    type: String,
  },
});

const EventSchema = new mongoose.Schema({
  event_title: {
    type: String,
    required: true,
  },
  event_organizer: {
    type: String,
    required: true,
  },
  event_description: {
    type: String,
    required: true,
  },
  event_image: {
    type: String,
    required: true,
  },
  event_date: {
    type: Date,
    required: true,
  },
  event_time: {
    type: String,
    required: true,
  },
  event_dep: {
    type: String,
    required: true,
  },
  attendees: [AttendeeSchema],
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
