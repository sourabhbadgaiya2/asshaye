const mongoose = require("mongoose");

const preSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
      },
    ],

    Price: {
      type: Number,
    },
    testmodule: {
      type: String,
    },
    seo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogSEO",
    },

    altText: {
      type: String,
    },
    Durations: {
      type: String,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },

    subsubCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subsubcategory",
    },

    CourseDescription: {
      type: String,
    },

    LastDate: {
      // Changed to Date if it's a date field
      type: Date,
    },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("coursetest", preSchema);
