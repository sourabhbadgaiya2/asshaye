const Banner = require("../Module/MemberModule");
const imagekit = require("../Utils/imageKit");

const Sucesserstudent = async (req, res) => {
  try {
    const {
      Membername,
      phone,
      email,
      address,
      desciption,
      Teamposition,
      size,
      altText,
      staticUrl,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    } = req.body;

    const parsedSize = typeof size === "string" ? JSON.parse(size) : size;

    // Handle image uploads
    const uploadedImages = [];
    const files = Array.isArray(req.files?.images)
      ? req.files.images
      : [req.files?.images].filter(Boolean);

    for (let file of files) {
      const buffer = file.data;
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: file.name,
      });
      uploadedImages.push(uploadResponse.url);
    }

    const banner = await Banner.create({
      Membername,
      Teamposition,
      phone,
      email,
      address,
      desciption,
      altText,
      images: uploadedImages,
      size: parsedSize,
      staticUrl,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    });

    res.status(201).json(banner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const Successerdisplay = async (req, res) => {
  try {
    const products = await Banner.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

const StoryDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Banner.findByIdAndDelete(id);
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMemberById = async (req, res) => {
  try {
    const product = await Banner.findById(req.params.id);
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
    const { id } = req.params;
    const formData = req.body;
    const files = req.files;

    // Find existing member
    const existingMember = await Banner.findById(id);
    if (!existingMember) {
      return res.status(404).json({ message: "Member not found." });
    }

    const updateData = {
      Membername: formData.Membername || existingMember.Membername,
      Teamposition: formData.Teamposition || existingMember.Teamposition,
      phone: formData.phone || existingMember.phone,
      email: formData.email || existingMember.email,
      address: formData.address || existingMember.address,
      desciption: formData.desciption || existingMember.desciption,
      altText: formData.altText || existingMember.altText,
      staticUrl: formData.staticUrl || existingMember.staticUrl,
      images: existingMember.images, // default, replaced below if new images uploaded
      size: formData.size ? JSON.parse(formData.size) : existingMember.size,
      metaTitle: formData.metaTitle || existingMember.metaTitle,
      metaDescription:
        formData.metaDescription || existingMember.metaDescription,
      metaKeywords: formData.metaKeywords || existingMember.metaKeywords,
      metaCanonical: formData.metaCanonical || existingMember.metaCanonical,
    };

    // If new images are uploaded, REPLACE the old ones
    if (files && files.images) {
      const uploadedImages = [];
      const imageFiles = Array.isArray(files.images)
        ? files.images
        : [files.images];

      for (let file of imageFiles) {
        const uploadResponse = await imagekit.upload({
          file: file.data,
          fileName: file.name,
        });
        uploadedImages.push(uploadResponse.url);
      }

      // ✅ Replace old images with new uploaded ones
      updateData.images = uploadedImages;
    }

    const updatedRecord = await Banner.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Member updated successfully.",
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  Sucesserstudent,
  Successerdisplay,
  StoryDelete,
  getMemberById,
  editDisplay,
  editDataSave,
};
