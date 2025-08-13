const JudgementModel = require("../Module/JudementModule"); // fixed naming consistency
const imagekit = require("../Utils/imageKit"); // make sure you import your imagekit instance properly

const judegemntcreate = async (req, res) => {
  try {
    const {
      title,
      subTitle,
      description,
      lastDate,
      publicerName,
      category,
      altText,
      staticUrl,
      size, // assuming you want to handle size as in your original code, though your schema doesn't have it
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    } = req.body;

    // Parse size if needed (you may remove if not used in schema)
    let parsedSize;
    try {
      parsedSize = typeof size === "string" ? JSON.parse(size) : size;
    } catch (err) {
      return res.status(400).json({ error: "Invalid size format" });
    }

    // Handle image uploads
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

    // Parse and validate lastDate
    const parsedLastDate = new Date(lastDate);
    if (lastDate && isNaN(parsedLastDate.getTime())) {
      return res.status(400).json({ error: "Invalid lastDate format" });
    }

    // Create Judgement document
    const judgement = await JudgementModel.create({
      title,
      subTitle,
      description,
      altText,
      lastDate: parsedLastDate || undefined,
      judementCategory: category,
      publicerName,
      images: uploadedImages,
      staticUrl,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
      // add size if you want to save it and schema supports it
    });

    res.status(201).json(judgement);
  } catch (error) {
    console.error("judegemntcreate error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const judegementdiplay = async (req, res) => {
  try {
    const products = await JudgementModel.find().populate("judementCategory");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

const RecordDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEnquiry = await JudgementModel.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
      data: deletedEnquiry,
    });
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete enquiry",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await JudgementModel.findById(req.params.id);
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
    const course = await JudgementModel.findById(req.params.id).populate(
      "judementCategory"
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const editDisplay = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "ID is required." });

    const record = await JudgementModel.findById(id);
    if (!record) return res.status(404).json({ message: "Record not found." });

    res.status(200).json(record);
  } catch (error) {
    console.error("Error fetching record for edit:", error);
    res.status(500).json({ message: error.message });
  }
};

const editDataSave = async (req, res) => {
  try {
    const {
      id,
      title,
      subTitle,
      description,
      lastDate,
      publicerName,
      category,
      altText,
      staticUrl,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    } = req.body;

    console.log(req.body);

    if (!id) {
      return res.status(400).json({ message: "ID is required." });
    }

    let images = [];

    if (req.files?.images) {
      const files = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
      for (const file of files) {
        const uploadResponse = await imagekit.upload({
          file: file.data,
          fileName: file.name,
        });
        images.push(uploadResponse.url);
      }
    }

    const updatedData = {
      title,
      subTitle,
      description,
      publicerName,
      altText,
      staticUrl,
      judementCategory: category,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
      ...(lastDate && { lastDate: new Date(lastDate) }),
      ...(images.length > 0 && { images }),
    };

    const updatedJudgement = await JudgementModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedJudgement) {
      return res.status(404).json({ message: "Judgement not found." });
    }

    res.status(200).json(updatedJudgement);
  } catch (error) {
    console.error("Error updating judgement:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  judegemntcreate,
  judegementdiplay,
  RecordDelete,
  getProductById,
  getCourseById,
  editDataSave,
  editDisplay,
};
