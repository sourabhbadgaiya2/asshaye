const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    staticUrl: {
      type: String,
      // required: true,
      // unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      default: "",
      trim: true,
    },
    metaKeywords: {
      type: [String], // Array of strings
      default: [],
    },
    metaDescription: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("SyllabusCategory", categorySchema);

// import mongoose from "mongoose";

// const SyllabusCategorySchema = new mongoose.Schema(
// {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   staticUrl: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true,
//   },
//   title: {
//     type: String,
//     default: "",
//     trim: true,
//   },
//   metaKeywords: {
//     type: [String], // Array of strings
//     default: [],
//   },
//   metaDescription: {
//     type: String,
//     default: "",
//     trim: true,
//   },
// },
//   { timestamps: true }
// );

// export default mongoose.models.SyllabusCategory ||
//   mongoose.model("SyllabusCategory", SyllabusCategorySchema);
