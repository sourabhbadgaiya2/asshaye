const mongoose = require("mongoose");
const SyllabusSchema = new mongoose.Schema(
  {
    Coursename: {
      type: String,
    },

    altText: {
      type: String,
    },
    staticUrl: {
      type: String,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SyllabusCategory",
    },
    seo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogSEO",
    },

    PDFbrochure: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Syllabus", SyllabusSchema);
