const Course = require("../../Module/OtherCourse/CourseModule"); // Adjust the path as needed
const imagekit = require("../../Utils/imageKit");

exports.createCourse = async (req, res) => {
  try {
    const {
      Seat,
      Semester,
      Coursename,
      StateCourse,
      Price,
      Instructor,
      Durations,
      Lessons,
      URL,
      TotalStudent,
      language,
      Certification,
      CourseDescription,
      InstructorCourse,
      Review,
      altText,
      TrainerName,
      LastDate,
      size,
      staticUrl,
    } = req.body;

    let parsedSize;
    try {
      parsedSize = typeof size === "string" ? JSON.parse(size) : size;
    } catch (err) {
      return res.status(400).json({ error: "Invalid size format" });
    }

    let uploadedImage = null;
    const filesRaw = req.files?.images;

    if (filesRaw) {
      const file = Array.isArray(filesRaw) ? filesRaw[0] : filesRaw;

      const buffer = file.data;
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: file.name,
      });

      uploadedImage = uploadResponse.url;
    }

    const parsedLastDate = new Date(LastDate);
    if (isNaN(parsedLastDate)) {
      return res.status(400).json({ error: "Invalid LastDate format" });
    }

    const course = await Course.create({
      Seat,
      Semester,
      Coursename,
      StateCourse,
      Price,
      Instructor,
      Durations,
      Lessons,
      URL,
      TotalStudent,
      language,
      Certification,
      CourseDescription,
      InstructorCourse,
      Review,
      altText,
      TrainerName,
      staticUrl,
      LastDate: parsedLastDate,
      size: parsedSize,
      images: uploadedImage || "", // ✅ single string
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("CourseSave error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const productsall = await Course.find();

    res.status(200).json(productsall);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    let uploadedImage = null;

    if (req.files?.images) {
      const file = Array.isArray(req.files.images)
        ? req.files.images[0]
        : req.files.images;

      const buffer = file.data;
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: file.name,
      });

      uploadedImage = uploadResponse.url;
    }

    if (uploadedImage) {
      req.body.images = uploadedImage; // ✅ बस नई image overwrite कर देगी
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error("UpdateCourse error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Additional custom controllers can be added as needed
// For example, get courses by semester:
exports.getCoursesBySemester = async (req, res) => {
  try {
    const courses = await Course.find({ Semester: req.params.semester });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Course.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCourseBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }

    const course = await Course.findOne({ staticUrl: slug });

    if (!course) {
      return res
        .status(404)
        .json({ message: "Course not found with this slug" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course by slug:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
