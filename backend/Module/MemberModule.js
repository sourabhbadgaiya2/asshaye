const mongoose = require("mongoose");
const MemberSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
      },
    ],
    Membername: {
      type: String,
    },

    Teamposition: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    desciption: {
      type: String,
    },
    altText: {
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

module.exports = mongoose.model("Member", MemberSchema);
