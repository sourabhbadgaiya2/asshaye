const Banner = require("../Module/SucessModule");
const imagekit = require("../Utils/imageKit");

const Sucesserstudent = async (req, res) => {
  try {
    const { StudentName, Judicial, size, altText, description } = req.body;

    const parsedSize = typeof size === "string" ? JSON.parse(size) : size;

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
      StudentName,
      Judicial,
      altText,
      description,
      images: uploadedImages,
      size: parsedSize,
    });

    res.status(201).json(banner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const Successerdisplay = async (req, res) => {
  try {
    const products = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

const StoryDelete = async (req, res) => {
  const { id } = req.params;
  await Banner.findByIdAndDelete(id);

  res.status(200).send("Task deleted");
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

// Save updated success student record
const editDataSave = async (req, res) => {
  try {
    const { id, StudentName, Judicial, size, altText, description } = req.body;

    if (!id) return res.status(400).json({ message: "ID is required." });

    // Handle image update if new image uploaded
    let images = req.body.images;
    if (req.files?.images) {
      const file = req.files.images;
      const uploadResponse = await imagekit.upload({
        file: file.data,
        fileName: file.name,
      });
      images = [uploadResponse.url];
    }

    const updated = await Banner.findByIdAndUpdate(
      id,
      {
        StudentName,
        Judicial,
        altText,
        description,
        size: size
          ? typeof size === "string"
            ? JSON.parse(size)
            : size
          : undefined,
        images,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Record not found." });
    }

    res
      .status(200)
      .json({ message: "Record updated successfully", data: updated });
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  Sucesserstudent,
  Successerdisplay,
  StoryDelete,
  editDisplay,
  editDataSave,
};
