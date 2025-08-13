const Banner = require("../Module/BlogModule");
const BlogSEO = require("../Module/SEO/blog");
const imagekit = require("../Utils/imageKit");

const BlogSave = async (req, res) => {
  try {
    const {
      Blog,
      author,
      URL,
      title,
      excerpt,
      LastDate,
      blogUrl,
      Alttage,
      category,
      Description,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    } = req.body;

    let savedSeo = null;
    if (metaTitle || metaDescription || metaKeywords) {
      const newSeo = new BlogSEO({
        title: metaTitle,
        description: metaDescription,
        keywords: metaKeywords,
        canonical: metaCanonical,
      });
      savedSeo = await newSeo.save();
    }

    // Handle image uploads
    const uploadedImages = [];
    const filesRaw = req.files?.images;

    if (filesRaw) {
      const files = Array.isArray(filesRaw) ? filesRaw : [filesRaw];

      for (const file of files) {
        const buffer = file.data;

        const uploadResponse = await imagekit.upload({
          file: buffer,
          fileName: file.name,
        });

        uploadedImages.push(uploadResponse.url);
      }
    }

    // Validate LastDate
    const parsedLastDate = new Date(LastDate);
    if (isNaN(parsedLastDate.getTime())) {
      return res.status(400).json({ error: "Invalid LastDate format" });
    }

    // Save blog (banner)
    const banner = await Banner.create({
      images: uploadedImages,
      Blog,
      author,
      title,
      URL,
      Alttage,
      excerpt,
      BlogCategory: category,
      Description,
      blogUrl,
      LastDate: parsedLastDate,
      seo: savedSeo ? savedSeo._id : null,
    });

    res.status(201).json(banner);
  } catch (error) {
    console.error("BlogSave error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const BlogDisplayAll = async (req, res) => {
  try {
    const enquiries = await Banner.find()
      .populate("BlogCategory")
      .populate("seo");
    res.status(200).json({
      success: true,
      data: enquiries,
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries",
      error: error.message,
    });
  }
};

const BlogDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Banner.findByIdAndDelete(id);
    res.status(200).send("Blog deleted successfully");
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Banner.findById(req.params.id).populate(
      "BlogCategory"
    );
    if (!product) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editDisplay = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID is required." });
    }

    const blog = await Banner.findById(id).populate("BlogCategory");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog for edit:", error);
    res.status(500).json({ message: error.message });
  }
};

const editDataSave = async (req, res) => {
  try {
    const {
      title,
      author,
      excerpt,
      Description,
      category,
      Alttage,
      URL,
      LastDate,
      id,
      blogUrl,
      images,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaCanonical,
    } = req.body;

    // ✅ Validate required fields
    if (!id) return res.status(400).json({ message: "ID is required." });
    if (!title || !author || !excerpt || !Description || !category) {
      return res.status(400).json({
        message:
          "Missing required fields: title, author, excerpt, description, or category",
      });
    }

    let finalImages = [];

    // ✅ Handle existing image URLs from req.body
    if (images) {
      finalImages = Array.isArray(images) ? images : [images];
    }

    // ✅ Handle new image uploads if files are present
    if (req.files?.images) {
      const files = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      for (const file of files) {
        try {
          const uploadResponse = await imagekit.upload({
            file: file.data,
            fileName: file.name,
          });
          finalImages.push(uploadResponse.url);
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError.message);
          return res.status(500).json({ message: "Image upload failed" });
        }
      }
    }

    // ✅ Convert LastDate to Date object (if valid)
    let parsedLastDate = undefined;
    if (LastDate) {
      const tempDate = new Date(LastDate);
      if (!isNaN(tempDate.getTime())) {
        parsedLastDate = tempDate;
      }
    }

    // ✅ Prepare the fields to update
    const updatedFields = {
      title,
      author,
      excerpt,
      Description,
      Alttage,
      URL,
      blogUrl,
      images: finalImages,
      BlogCategory: category,
    };

    // Add LastDate only if it's valid
    if (parsedLastDate) {
      updatedFields.LastDate = parsedLastDate;
    }

    // ✅ Remove undefined/null fields before updating
    Object.keys(updatedFields).forEach((key) => {
      if (
        updatedFields[key] === undefined ||
        updatedFields[key] === null ||
        updatedFields[key] === ""
      ) {
        delete updatedFields[key];
      }
    });

    // Handle SEO updates
    if (metaTitle || metaDescription || metaKeywords || metaCanonical) {
      const blog = await Banner.findById(id);
      if (blog && blog.seo) {
        await BlogSEO.findByIdAndUpdate(blog.seo, {
          title: metaTitle,
          description: metaDescription,
          keywords: metaKeywords,
          canonical: metaCanonical,
        });
      } else if (blog) {
        const newSeo = new BlogSEO({
          title: metaTitle,
          description: metaDescription,
          keywords: metaKeywords,
          canonical: metaCanonical,
        });
        const savedSeo = await newSeo.save();
        updatedFields.seo = savedSeo._id;
      }
    }

    // ✅ Update blog by ID
    const updated = await Banner.findByIdAndUpdate(id, updatedFields, {
      new: true,
    }).populate("BlogCategory");

    if (!updated) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // ✅ Success
    res.status(200).json({
      message: "Blog updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({
      message: error.message || "Server error occurred during update.",
    });
  }
};

module.exports = {
  BlogSave,
  BlogDisplayAll,
  BlogDelete,
  getProductById,
  editDataSave,
  editDisplay,
};
