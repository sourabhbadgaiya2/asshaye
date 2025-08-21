const Blog = require("../../Module/BlogModule");
const BlogSEO = require("../../Module/SEO/blog");
const modelMap = require("../../Module/SEO/map");
const modelConfig = require("../../Module/SEO/urlConfig");

const pickName = (doc, modelName) => {
  switch (modelName) {
    case "blog":
      return doc.Title || doc.title || "Untitled";
    case "course":
      return doc.Coursename || doc.title || "Untitled";
    case "event":
      return doc.Title || doc.eventName || "Untitled";
    case "judgment":
      return doc.title || "Untitled";
    case "teammember":
      return doc.memberName || doc.Membername || doc.name || "Untitled";
    case "whatsnew":
      return doc.Coursename || "Untitled";
    case "about":
      return doc.title || "About";
    case "othercourse":
      return doc.Coursename || "othercourse";
    case "successstory":
      return doc.Judicial || "successstory";
    default:
      return "Untitled";
  }
};

// ✅ 2. Get all Blog SEO
const getAllBlogSEOs = async (req, res) => {
  try {
    const seos = await BlogSEO.find().sort({ createdAt: -1 });
    return res.status(200).json(seos);
  } catch (error) {
    console.error("Get All SEO Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ 3. Get Blog SEO by ID
const getBlogSEOById = async (req, res) => {
  try {
    const seo = await BlogSEO.findById(req.params.id);
    if (!seo) {
      return res.status(404).json({ message: "SEO not found" });
    }

    return res.status(200).json(seo);
  } catch (error) {
    console.error("Get SEO By ID Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Create SEO and link with any model dynamically
const createSEO = async (req, res) => {
  try {
    const { title, description, keywords, modelName, itemId } = req.body;

    if (!title || !description || !keywords || !modelName || !itemId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const Model = modelMap[modelName.toLowerCase()];

    if (!Model) {
      return res.status(400).json({ message: "Invalid model name" });
    }

    const item = await Model.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: `${modelName} not found` });
    }

    const seo = await BlogSEO.create({
      title,
      description,
      keywords,
      itemId,
      modelName: modelName.toLowerCase(), // ✅ Save model name
    });

    item.seo = seo._id;
    await item.save();

    return res.status(201).json({
      message: `SEO created and linked with ${modelName} successfully`,
      seo,
    });
  } catch (error) {
    console.error("Create SEO Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /seo?model=blog
// const getSEOsByModel = async (req, res) => {
//   try {
//     const modelName = req.query.model?.toLowerCase();
//     if (!modelName) {
//       return res.status(400).json({ message: "model query is required" });
//     }

//     const seos = await BlogSEO.find({ modelName }).sort({ createdAt: -1 });
//     return res.status(200).json(seos);
//   } catch (error) {
//     console.error("Get SEOs by model Error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
const getSEOsByModel = async (req, res) => {
  try {
    const modelName = req.query.model?.toLowerCase();
    if (!modelName) {
      return res.status(400).json({ message: "model query is required" });
    }

    // Fetch all SEO records for this model
    const seos = await BlogSEO.find({ modelName }).sort({ createdAt: -1 });

    // Collect unique itemIds
    const ids = seos.map((s) => s.itemId).filter(Boolean);
    const Model = modelMap[modelName];
    if (!Model || !ids.length) {
      // No linked items – return plain SEO list
      return res.status(200).json(seos);
    }

    // Load linked documents
    const items = await Model.find({ _id: { $in: ids } });
    const nameMap = new Map(
      items.map((i) => [i._id.toString(), pickName(i, modelName)])
    );

    // Inject itemName into each SEO object
    const enriched = seos.map((seo) => ({
      ...seo.toObject(),
      itemName: nameMap.get(seo.itemId?.toString()) || "Untitled",
    }));

    return res.status(200).json(enriched);
  } catch (error) {
    console.error("Get SEOs by model Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete SEO and unlink from dynamic model
const deleteSEO = async (req, res) => {
  try {
    const { modelName } = req.query; // pass model name as query param

    const seo = await BlogSEO.findByIdAndDelete(req.params.id);
    if (!seo) {
      return res.status(404).json({ message: "SEO not found" });
    }

    const Model = modelMap[modelName.toLowerCase()];
    if (Model) {
      await Model.updateMany({ seo: seo._id }, { $unset: { seo: "" } });
    }

    return res.status(200).json({
      message: `SEO deleted and unlinked from ${modelName || "items"}`,
    });
  } catch (error) {
    console.error("Delete SEO Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateSEO = async (req, res) => {
  try {
    const { title, description, keywords, modelName, itemId } = req.body;
    const seoId = req.params.id;

    const seo = await BlogSEO.findById(seoId);
    if (!seo) {
      return res.status(404).json({ message: "SEO not found" });
    }

    // Optional: validate model name
    if (modelName && seo.modelName !== modelName.toLowerCase()) {
      return res.status(400).json({ message: "Model name mismatch" });
    }

    // Update fields
    seo.title = title || seo.title;
    seo.description = description || seo.description;
    seo.keywords = keywords || seo.keywords;

    await seo.save();

    // Optional: if itemId is sent, update its SEO reference
    if (itemId && modelName) {
      const Model = modelMap[modelName.toLowerCase()];
      if (Model) {
        const item = await Model.findById(itemId);
        if (item) {
          item.seo = seo._id;
          await item.save();
        }
      }
    }

    return res.status(200).json({
      message: "SEO updated successfully",
      seo,
    });
  } catch (error) {
    console.error("Update SEO Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const generatedUrl = async (req, res) => {
  try {
    const allUrls = [];

    // modelMap को loop करें
    for (const [modelName, Model] of Object.entries(modelMap)) {
      // चेक करें कि इस मॉडल का configuration मौजूद है या नहीं
      const config = modelConfig[modelName];
      if (!config) {
        console.warn(`No URL config found for model: ${modelName}`);
        continue;
      }

      // डेटाबेस से सभी documents fetch करें
      const documents = await Model.find({});

      // हर document के लिए URL बनाएँ और allUrls array में जोड़ें
      documents.forEach((doc) => {
        const urlField = config.urlField;
        const urlValue = doc[urlField];

        if (urlValue) {
          const slug = urlValue
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
          const fullUrl = `${config.basePath}/${slug}`;

          allUrls.push({
            title: doc.title || doc.name || slug, // एक title फील्ड ढूंढें
            type: modelName,
            url: fullUrl,
          });
        }
      });
    }

    res.json(allUrls);
  } catch (error) {
    console.error("Failed to get generated URLs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createSEO,
  getAllBlogSEOs,
  getBlogSEOById,
  updateSEO,
  deleteSEO,
  getSEOsByModel,
  generatedUrl,
};
