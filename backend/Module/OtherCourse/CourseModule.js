const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    Seat: {
      type: String,
    },
    images: {
      type: String,
    },
    altText: {
      type: String,
    },

    Semester: {
      type: Number,
    },
    Coursename: {
      type: String,
    },
    StateCourse: {
      type: String,
    },
    Price: {
      type: Number,
    },
    Instructor: {
      type: String,
    },
    URL: {
      type: String,
    },
    Durations: {
      type: String,
    },
    Alttage: {
      type: String,
    },
    Lessons: {
      type: Number,
    },
    TotalStudent: {
      type: Number,
    },

    seo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogSEO",
    },

    language: {
      type: String,
    },
    Certification: {
      // Corrected the typo here
      type: String,
    },
    CourseDescription: {
      type: String,
    },
    InstructorCourse: {
      type: String,
    },
    Review: {
      type: String,
    },
    TrainerName: {
      type: String,
    },
    staticUrl: {
      type: String,
    },

    LastDate: {
      // Changed to Date if it's a date field
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("othercourse", courseSchema);
