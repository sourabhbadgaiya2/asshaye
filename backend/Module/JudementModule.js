const mongoose = require("mongoose");

const judgementSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
    },
    judementCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "judementCategory",
    },

    description: {
      type: String,
    },
    publicerName: {
      type: String,
    },

    lastDate: {
      type: Date,
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
    altText: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Judgement", judgementSchema);
