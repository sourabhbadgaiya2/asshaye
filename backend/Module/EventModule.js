const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
    },
    altText: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    Time: {
      type: String,
    },
    StartDate: {
      // Changed to Date if it's a date field
      type: Date,
    },

    Description: {
      type: String,
    },
    Location: {
      type: String,
    },
    Cost: {
      type: Number,
    },
    Slot: {
      type: Number,
    },
    subTitle: {
      type: String,
    },
    staticUrl: {
      type: String,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    metaCanonical: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Event", ContactSchema);

module.exports = Contact;
