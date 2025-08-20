const Course = require("../Module/SyllabusModule");
const Category = require("../Module/CategoryModule"); // Make sure to import Category model
const imagekit = require("../Utils/imageKit");

const fileUpload = async (file) => {
  const buffer = file.data;
  if (!buffer || !file.name) {
    throw new Error("Invalid file data");
  }

  const uploadResponse = await imagekit.upload({
    file: buffer,
    fileName: file.name,
  });
  return uploadResponse.url;
};

const WhatsNewSave = async (req, res) => {
  try {
    const { title, category, altText } = req.body;
    const pdfFile = req.files?.PDFbrochure;

    if (!title || !category || !pdfFile) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and PDF brochure are required",
      });
    }

    const pdfUrl = await fileUpload(pdfFile);
    const course = await Course.create({
      Coursename: title,
      category,
      altText,
      PDFbrochure: pdfUrl,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    console.error("WhatsNewSave error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

const getWhatsNew = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch courses",
    });
  }
};

const WhatsNewDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: "WhatsNew entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "WhatsNew entry deleted successfully",
    });
  } catch (error) {
    console.error("WhatsNewDelete error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

const WhatsNewById = async (req, res) => {
  try {
    const syllabus = await Course.findById(req.params.id).populate("category");

    if (!syllabus)
      return res.status(404).json({ message: "Syllabus not found" });
    res.json(syllabus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCoursesByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const courses = await Course.find({ category: id }).populate("category");

    if (!courses || courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for this category" });
    }

    res.json(courses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const editDisplay = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "ID is required." });

    const record = await Course.findById(id).populate("category");
    if (!record) return res.status(404).json({ message: "Record not found." });

    // Fetch all categories to send with the response
    const categories = await Category.find({});

    res.status(200).json({
      record,
      categories,
    });
  } catch (error) {
    console.error("Error fetching record for edit:", error);
    res.status(500).json({ message: error.message });
  }
};

const editDataSave = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "ID is required." });

    // Get form data from either multipart form or JSON body
    const { Coursename, category, altText } = req.body;
    let PDFbrochure = req.body.PDFbrochure;

    // Handle file upload if new file is provided
    if (req.files?.PDFbrochure) {
      PDFbrochure = await fileUpload(req.files.PDFbrochure);
    }

    // Validate required fields
    if (!Coursename || !category || !altText) {
      return res.status(400).json({
        message: "Course name and category are required",
      });
    }

    const updateData = {
      Coursename,
      category,
      altText,
      ...(PDFbrochure && { PDFbrochure }), // Only include if exists
    };

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("category");

    if (!updatedCourse) {
      return res.status(404).json({ message: "Record not found." });
    }

    res.status(200).json({
      message: "Record updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  WhatsNewSave,
  getWhatsNew,
  WhatsNewDelete,
  WhatsNewById,
  getCoursesByCategory,
  editDisplay,
  editDataSave,
};
