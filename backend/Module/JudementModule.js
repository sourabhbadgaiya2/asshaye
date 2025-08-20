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
    seo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogSEO",
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
    altText: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Judgement", judgementSchema);
