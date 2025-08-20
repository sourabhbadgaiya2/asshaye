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
    seo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogSEO",
    },
    staticUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", MemberSchema);
