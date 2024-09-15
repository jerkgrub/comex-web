const mongoose = require("mongoose");

const CreditingSchema = new mongoose.Schema(
  {
    // Reference to the user who is applying for crediting
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Reference to the related activity
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    },

    // Total number of hours the user is crediting
    totalHours: {
      type: Number,
    },

    // File upload for supporting documents
    supportingDocuments: {
      type: String, // Assume storing file paths, URLs, or filenames
    },

    // Faculty reflection text
    facultyReflection: {
      type: String,
    },

    // Status of the crediting request (Pending, Approved, Rejected)
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    // Approval details
    approvalDetails: {
      approvedBy: {
        type: String, // Could reference Admin or Faculty who approves
        default: null,
      },
      approvalDate: {
        type: Date,
        default: null,
      },
      rejectionReason: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields automatically

const Crediting = mongoose.model("Crediting", CreditingSchema);
module.exports = Crediting;
