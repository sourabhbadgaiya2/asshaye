const EnquiryModel = require("../Module/ContactModule");
const nodemailer = require("nodemailer");

const ContactProduct = async (req, res) => {
  const { name, email, phone, message } = req.body; // Added productName here

  try {
    const enquiry = await EnquiryModel.create({
      name,
      email,
      phone,

      message,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adityajainghetal@gmail.com", // Secure way: use environment variables
        pass: "wjiv vwra gbpo mkgr",
      },
    });

    const mailOptions = {
      from: email,
      to: "adityajainghetal@gmail.com",
      city: "Enquiry Received",
      text: `Thank you for your enquiry.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions); // use await instead of callback function for better control

    res.status(201).json({
      success: true,
      message: "User enquiry successfully sent",
      data: enquiry,
    });
  } catch (error) {
    console.error("Enquiry error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during enquiry submission",
      error: error.message,
    });
  }
};

const ContactDisplay = async (req, res) => {
  try {
    const myData = await EnquiryModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: myData,
    });
  } catch (error) {
    console.error("Fetching enquiries error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries",
      error: error.message,
    });
  }
};

const RecordDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEnquiry = await EnquiryModel.findByIdAndDelete(id);

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

const editDisplay = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID is required." });
    }

    const enquiry = await EnquiryModel.findById(id);

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found." });
    }

    res.status(200).json(enquiry);
  } catch (error) {
    console.error("Error fetching enquiry for edit:", error);
    res.status(500).json({ message: error.message });
  }
};

const editDataSave = async (req, res) => {
  try {
    const { id } = req.params; // Now getting ID from URL params
    const { name, email, phone, message } = req.body;

    const updatedQuery = await EnquiryModel.findByIdAndUpdate(
      id,
      { name, email, phone, message },
      { new: true }
    );

    if (!updatedQuery) {
      return res.status(404).json({ message: "Query not found." });
    }

    res.status(200).json({
      message: "Query updated successfully",
      data: updatedQuery,
    });
  } catch (error) {
    console.error("Error updating query:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET - Contact enquiries created today only
const ContactDisplayToday = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todayEnquiries = await EnquiryModel.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: todayEnquiries,
    });
  } catch (error) {
    console.error("Error fetching today's contact enquiries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch today's enquiries",
      error: error.message,
    });
  }
};

module.exports = {
  ContactProduct,
  ContactDisplay,
  RecordDelete,
  editDisplay,
  editDataSave,
  ContactDisplayToday,
};
