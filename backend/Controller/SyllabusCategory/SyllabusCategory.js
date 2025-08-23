const Category = require("../../Module/SyllabusCategoryModule");
// Get all Categorys
const getAllCategorys = async (req, res) => {
  try {
    const Categorys = await Category.find().sort({ createdAt: -1 });
    // console.log(Categorys, "Get all categrpye");
    res.status(200).json(Categorys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Category by ID
const getCategoryById = async (req, res) => {
  try {
    const Category = await Category.findById(req.params.id);
    if (!Category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(Category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    let {
      name,
      testSeries = [],
      staticUrl = "",
      title = "",
      metaKeywords = "",
      metaDescription = "",
    } = req.body;

    // Agar name ek object hai, usko destructure karo
    if (typeof name === "object" && name !== null) {
      staticUrl = name.staticUrl || "";
      title = name.title || "";
      metaKeywords = name.metaKeywords || "";
      metaDescription = name.metaDescription || "";
      name = name.name || "";
    }

    // Validation
    if (typeof name !== "string" || !name.trim()) {
      return res
        .status(400)
        .json({ error: "Category name must be a non-empty string" });
    }

    const newCategory = new Category({
      name: name.trim(),
      testSeries,
      staticUrl: staticUrl.trim(),
      title: title.trim(),
      metaKeywords: metaKeywords.trim(),
      metaDescription: metaDescription.trim(),
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: error.message });
  }
};

// const createCategory = async (req, res) => {
//   console.log(req.body, "category syllbus");

//   try {
//     const { name } = req.body;
//     const newCategory = new Category({
//       name,
//       testSeries,
//       staticUrl,
//       title,
//       metaKeywords,
//       metaDescription,
//     }); // Add testSeries here
//     await newCategory.save();
//     res.status(201).json(newCategory);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const updateCategory = async (req, res) => {
  try {
    let {
      name,
      testSeries = [],
      staticUrl = "",
      title = "",
      metaKeywords = "",
      metaDescription = "",
    } = req.body;

    // Agar name ek object hai, frontend format issue fix
    if (typeof name === "object" && name !== null) {
      staticUrl = name.staticUrl || "";
      title = name.title || "";
      metaKeywords = name.metaKeywords || "";
      metaDescription = name.metaDescription || "";
      name = name.name || "";
    }

    // Validation: name must be non-empty string
    if (typeof name !== "string" || !name.trim()) {
      return res
        .status(400)
        .json({ error: "Category name must be a non-empty string" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        testSeries,
        staticUrl: staticUrl.trim(),
        title: title.trim(),
        metaKeywords: metaKeywords.trim(),
        metaDescription: metaDescription.trim(),
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const categories = await Category.find();
    res
      .status(200)
      .json({ message: "Category updated successfully", data: categories });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a Category
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    const Categorys = await Category.find();
    res
      .status(200)
      .json({ message: "Category deleted successfully", data: Categorys });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCategorys,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
