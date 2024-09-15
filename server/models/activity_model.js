const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  // activity details
  type: String,
  isActivated: Boolean,
  title: String,
  organizer: String,
  description: String,
  image: String,
  startDate: String,
  endDate: String,
  time: String,
  hours: Number,
  department: String,
  progress: String,

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
