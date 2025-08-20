const Banner = require("../Module/WhyChooseModule");
const imagekit = require("../Utils/imageKit");

// Create a new success story
const SuccesserStudent = async (req, res) => {
  try {
    const {
      Title,
      description,
      keywordone,
      keywordtwo,
      keywordthree,
      keywordfour,
      keywordfive,
      keywordsix,
      altText,
      size,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    } = req.body;

    const parsedSize = typeof size === 'string' ? JSON.parse(size) : size;

    // Handle image uploads
    const uploadedImages = [];
    const files = Array.isArray(req.files?.images)
      ? req.files.images
      : [req.files?.images].filter(Boolean); // Ensure single file still gets handled

    for (let file of files) {
      const buffer = file.data;
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: file.name,
      });
      uploadedImages.push(uploadResponse.url);
    }

    const banner = await Banner.create({
      Title,
      description,
      keywordone,
      keywordtwo,
      keywordthree,
      keywordfour,
      keywordfive,
      keywordsix,
      altText,
      images: uploadedImages,
      size: parsedSize,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    });

    res.status(201).json(banner);
  } catch (error) {
    console.error("Error in SuccesserStudent:", error);
    res.status(500).json({ error: error.message });
  }
};

// Display all success stories
const SuccesserDisplay = async (req, res) => {
  try {
    const products = await Banner.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching success stories:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a specific success story
const StoryDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Banner.findByIdAndDelete(id);
    res.status(200).send("Success story deleted");
  } catch (error) {
    console.error("Error deleting story:", error);
    res.status(500).json({ message: error.message });
  }
};


const editDisplay = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "ID is required." });

    const record = await Banner.findById(id);
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
      Title,
      description,
      keywordone,
      keywordtwo,
      keywordthree,
      keywordfour,
      keywordfive,
      altText,
      keywordsix,
      size,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    } = req.body;

    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "ID is required." });

    const parsedSize = typeof size === "string" ? JSON.parse(size) : size;

    // Handle image uploads if provided (optional)
    let uploadedImages = [];
    if (req.files?.images) {
      const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      for (const file of files) {
        const buffer = file.data;
        const uploadResponse = await imagekit.upload({
          file: buffer,
          fileName: file.name,
        });
        uploadedImages.push(uploadResponse.url);
      }
    }

    const updateData = {
      Title,
      description,
      keywordone,
      keywordtwo,
      keywordthree,
      keywordfour,
      keywordfive,
      altText,
      keywordsix,
      size: parsedSize,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    };

    // Only update images if new ones were uploaded
    if (uploadedImages.length > 0) {
      updateData.images = uploadedImages;
    }

    const updatedRecord = await Banner.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found." });
    }

    res.status(200).json({ message: "Record updated successfully", data: updatedRecord });
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  SuccesserStudent,
  SuccesserDisplay,
  StoryDelete,
  editDisplay,
  editDataSave
};
