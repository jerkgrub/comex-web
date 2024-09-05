const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({

  // activity details
  title: String,
  organizer: String,
  description: String,
  image: String,
  date: String,
  time: String,
  department: String,

  // respondents
  respondents: [{ userId: String }],

  // approvals
  adminApproval: {
    isApproved: Boolean,
    approvedBy: String,
    approvalDate: Date,
  },
});

const Activity = mongoose.model("Activity", ActivitySchema);
module.exports = Activity;
