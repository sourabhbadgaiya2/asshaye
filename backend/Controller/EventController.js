const Contact = require("../Module/EventModule");
const imagekit = require("../Utils/imageKit");

const ContactSave = async (req, res) => {
  try {
    const {
      Title,
      Time,
      StartDate,
      Description,
      Location,
      Cost,
      altText,
      staticUrl,
      Slot,
      subTitle,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    } = req.body;

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

    // Parse and validate StartDate
    const parsedStartDate = new Date(StartDate);
    if (isNaN(parsedStartDate)) {
      return res.status(400).json({ error: "Invalid StartDate format" });
    }

    // Create Contact
    const contact = await Contact.create({
      Title,
      images: uploadedImages,
      Time,
      altText,
      StartDate: parsedStartDate,
      Description,
      Location,
      staticUrl,
      Cost: Number(Cost),
      Slot: Number(Slot),
      subTitle,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    });

    res.status(201).json(contact);
  } catch (error) {
    console.error("ContactSave error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single contact by ID
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (updatedData.StartDate) {
      updatedData.StartDate = new Date(updatedData.StartDate);
      if (isNaN(updatedData.StartDate)) {
        return res.status(400).json({ error: "Invalid StartDate format" });
      }
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Contact.findById(req.params.id);
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
    const { id } = req.params; // Changed from req.query to req.params for consistency

    if (!id) {
      return res.status(400).json({ message: "ID is required." });
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error("Error fetching contact for edit:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update contact data
const editDataSave = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Title,
      Time,
      StartDate,
      Description,
      Location,
      altText,
      staticUrl,
      Cost,
      Slot,
      subTitle,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    } = req.body;

    // Handle image uploads if any
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

    // Prepare update data
    const updateData = {
      Title,
      Time,
      Description,
      Location,
      altText,
      staticUrl,
      Cost: Number(Cost),
      Slot: Number(Slot),
      subTitle,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    };

    if (StartDate) {
      const parsedStartDate = new Date(StartDate);
      if (isNaN(parsedStartDate)) {
        return res.status(400).json({ error: "Invalid StartDate format" });
      }
      updateData.StartDate = parsedStartDate;
    }

    if (uploadedImages.length > 0) {
      updateData.images = uploadedImages;
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    res.status(200).json({
      message: "Contact updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  ContactSave,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  getCourseById,
  editDataSave,
  editDisplay,
};
