const mongoose = require("mongoose");

const BlogSeoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: String, required: true },

    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "modelName",
    },

    modelName: {
      type: String,
      required: true,
      enum: [
        "blog",
        "course",
        "event",
        "judgment",
        "about",
        "teammember",
        "whatsnew",
        "othercourse",
      ], // Safe
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BlogSEO", BlogSeoSchema);
