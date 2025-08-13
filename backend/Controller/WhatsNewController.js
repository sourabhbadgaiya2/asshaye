const Course = require("../Module/WhatsModule");
const imagekit = require("../Utils/imageKit");

const fs = require("fs");
const path = require("path");

const fileUpload = async (file) => {
  const buffer = file.data;
  const uploadResponse = await imagekit.upload({
    file: buffer,
    fileName: file.name,
  });
  return uploadResponse.url;
};

const WhatsNewSave = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      altText,
      staticUrl,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    } = req.body;

    // Handle image uploads
    const imageFiles = req.files?.images || [];
    const pdfFile = req.files?.PDFbrochure;

    const pdfUrl = await fileUpload(pdfFile);
    const imageUrls = await fileUpload(imageFiles);

    // Create new Course
    const course = await Course.create({
      Coursename: title,
      CourseDescription: description,
      category,
      altText,
      staticUrl,
      images: imageUrls,
      PDFbrochure: pdfUrl,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
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
    const courses = await Course.find().populate("category");
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
    const { id } = req.params;
    const course = await Course.findById(id).populate("category");

    if (!course) {
      return res.status(404).json({
        success: false,
        error: "WhatsNew entry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("WhatsNewById error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

const getMemberById = async (req, res) => {
  try {
    const product = await Course.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editDisplay = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "ID is required." });

    const record = await Course.findById(id);
    if (!record) return res.status(404).json({ message: "Record not found." });

    res.status(200).json(record);
  } catch (error) {
    console.error("Error fetching record for edit:", error);
    res.status(500).json({ message: error.message });
  }
};

const editDataSave = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      altText,
      staticUrl,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    } = req.body;

    // Initialize update data with basic fields
    const updateData = {
      Coursename: title,
      CourseDescription: description,
      category,
      altText,
      staticUrl,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    };

    // Handle PDF update if new file provided
    if (req.files?.PDFbrochure) {
      const pdfFile = req.files.PDFbrochure;
      updateData.PDFbrochure = await fileUpload(pdfFile);
    }

    // Handle images update if new files provided
    if (req.files?.images) {
      const imageFiles = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
      const imageUrls = await Promise.all(imageFiles.map(fileUpload));
      updateData.images = imageUrls;
    }

    // Update the course
    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("category");

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  WhatsNewSave,
  getWhatsNew,
  WhatsNewDelete,
  WhatsNewById,
  editDisplay,
  editDataSave,
  getMemberById,
};
