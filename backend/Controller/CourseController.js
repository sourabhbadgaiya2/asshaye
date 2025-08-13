const UserModel = require("../Module/QueryModule");
const Course = require("../Module/Coursemodule");
const imagekit = require("../Utils/imageKit");

const Querysave = async (req, res) => {
  const { Name, Phone, State, Medium, message } = req.body;

  try {
    const User = await UserModel.create({
      Name: Name,
      Phone: Phone,
      State: State,
      Medium: Medium,
      message: message,
    });

    res.status(200).send("user succesfully registered!");
  } catch (error) {
    console.log(error);
  }
};

const editDisplay = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID is required." });
    }

    const data = await UserModel.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Query not found." });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching query:", error);
    res.status(500).json({ message: error.message });
  }
};

const editDataSave = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Handle image uploads if files are present
    if (req.files && req.files.images) {
      const uploadedImages = [];
      const files = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      for (let file of files) {
        const buffer = file.data;
        const uploadResponse = await imagekit.upload({
          file: buffer,
          fileName: file.name,
        });
        uploadedImages.push(uploadResponse.url);
      }

      // Combine existing images (if any) with new ones
      updateData.images = [
        ...(req.body.existingImages || []),
        ...uploadedImages,
      ];
    }

    // Handle images to delete
    if (req.body.imagesToDelete) {
      const imagesToDelete = Array.isArray(req.body.imagesToDelete)
        ? req.body.imagesToDelete
        : [req.body.imagesToDelete];

      updateData.images = (
        updateData.images ||
        req.body.existingImages ||
        []
      ).filter((img) => !imagesToDelete.includes(img));
    }

    // Handle other special fields
    if (updateData.LastDate) {
      updateData.LastDate = new Date(updateData.LastDate);
      if (isNaN(updateData.LastDate)) {
        return res.status(400).json({ error: "Invalid LastDate format" });
      }
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory");

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(updatedCourse);
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(500).json({
      message: "Failed to update course",
      error: err.message,
    });
  }
};
const getAllQuery = async (req, res) => {
  try {
    const products = await UserModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

const CourseSave = async (req, res) => {
  console.log(req.body, "courses");

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
      Alttage,
      subCategory,
      subsubCategory,
      TrainerName,
      LastDate,
      size,
      category,
      payNow,
      staticUrl,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    } = req.body;

    // if (!subCategory || !category) {
    //   return res.status(400).json({ error: "Course name and category are required" });
    // }

    let parsedSize;
    try {
      parsedSize = typeof size === "string" ? JSON.parse(size) : size;
    } catch (err) {
      return res.status(400).json({ error: "Invalid size format" });
    }

    const uploadedImages = [];
    const filesRaw = req.files?.images;

    if (filesRaw) {
      const files = Array.isArray(filesRaw) ? filesRaw : [filesRaw];

      for (let file of files) {
        const buffer = file.data;
        const uploadResponse = await imagekit.upload({
          file: buffer,
          fileName: file.name,
        });
        uploadedImages.push(uploadResponse.url);
      }
    }

    const parsedLastDate = new Date(LastDate);
    if (isNaN(parsedLastDate)) {
      return res.status(400).json({ error: "Invalid LastDate format" });
    }

    // NOTE: Adjust the following lines based on your actual category model if needed
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
      Alttage,
      TotalStudent,
      language,
      Certification,
      CourseDescription,
      InstructorCourse,
      Review,
      TrainerName,
      LastDate: parsedLastDate,
      size: parsedSize,
      category,
      subCategory,
      subsubCategory,
      images: uploadedImages,
      payNow,
      staticUrl,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("CourseSave error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const CourseDelete = async (req, res) => {
  const { id } = req.params;
  await Course.findByIdAndDelete(id);

  res.status(200).send("Task deleted");
};

const QueryDelete = async (req, res) => {
  const { id } = req.params;
  await UserModel.findByIdAndDelete(id);

  res.status(200).send("Task deleted");
};

const getAllCourse = async (req, res) => {
  try {
    const products = await Course.find({ homeVisibility: true })
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory")
      .sort({ sortOrder: 1, createdAt: 1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAllCoursedisplay = async (req, res) => {
  try {
    const productsall = await Course.find()
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory") // Add this line to populate subcategory
      .sort({ sortOrder: 1, createdAt: 1 });

    res.status(200).json(productsall);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAllCourseHome = async (req, res) => {
  try {
    const product = await Course.find({ homeVisibility: true })
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory")
      .sort({ sortOrder: 1, createdAt: 1 });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getsubcategory = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate MongoDB ObjectId
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: "Invalid ID format" });
    // }

    console.log("Fetching courses for subsubCategory ID:", id);

    const courses = await Course.find({ subsubCategory: id });

    if (!courses.length) {
      return res
        .status(404)
        .json({ message: "No courses found for this subsubCategory." });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses by subsubCategory ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const getrecorededcourse = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate MongoDB ObjectId
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: "Invalid ID format" });
    // }

    // console.log("Fetching courses for subsubCategory ID:", id);

    const courses = await Course.find({ subsubCategory: id })
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory"); // Add this line to populate subcategory
    if (!courses.length) {
      return res
        .status(404)
        .json({ message: "No courses found for this subsubCategory." });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses by subsubCategory ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const getproducthome = async (req, res) => {
  const { homeVisibility } = req.body;

  // Create a new variable to toggle
  const newHomeVisibility = homeVisibility;

  try {
    // console.log(homeVisibility, "sdafsa");
    const updatedProduct = await Course.findByIdAndUpdate(
      req.params.id,
      { homeVisibility: homeVisibility },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating home visibility" });
  }
};

const getProductById = async (req, res) => {
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

const getCourseById = async (req, res) => {
  try {
    // Validate the ID parameter
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid course ID format" });
    }

    const course = await Course.findById(req.params.id)
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory"); // Add subcategory population

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Optional: Format the response data
    const responseData = {
      ...course._doc,
      category: course.category || null,
      subCategory: course.subCategory || null,
    };

    res.status(200).json(responseData);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

const getCoursesByCategory = async (req, res) => {
  try {
    const courses = await Course.find({ category: req.params.id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const reorderCourses = async (req, res) => {
  try {
    const { order, ids } = req.body;

    // Normalize payloads:
    // - order: [{ id, sortOrder }]
    // - ids: [id1, id2, ...] representing top-to-bottom order
    let updates = [];

    if (Array.isArray(order)) {
      updates = order
        .filter((it) => it && it.id != null && typeof it.sortOrder === "number")
        .map((it) => ({ id: it.id, sortOrder: it.sortOrder }));
    } else if (Array.isArray(ids)) {
      updates = ids.map((id, idx) => ({ id, sortOrder: idx }));
    }

    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ message: "Invalid payload: expected 'order' or 'ids' array" });
    }

    const ops = updates.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { sortOrder: item.sortOrder } },
      },
    }));

    await Course.bulkWrite(ops);
    res.status(200).json({ message: "Order updated", updated: updates.length });
  } catch (err) {
    console.error("Error reordering courses:", err, req.body);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  Querysave,
  CourseSave,
  getAllCourse,
  CourseDelete,
  getAllQuery,
  QueryDelete,
  getProductById,
  getCourseById,
  getCoursesByCategory,
  editDisplay,
  editDataSave,
  getAllCourseHome,
  getproducthome,
  getAllCoursedisplay,
  getsubcategory,
  getrecorededcourse,
  reorderCourses,
};
