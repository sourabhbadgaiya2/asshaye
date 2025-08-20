const express = require("express");
const router = express.Router();

const {
  createSEO,
  getAllBlogSEOs,
  getBlogSEOById,
  updateSEO,
  deleteSEO,
  getSEOsByModel,
  generatedUrl,
} = require("../../Controller/Seo/blogSeoCtrl");

// Create
router.post("/create", createSEO);

// Read All
router.get("/", getAllBlogSEOs);

router.get("/by-model", getSEOsByModel);

router.get('/generated-urls', generatedUrl);

// Read One
router.get("/:id", getBlogSEOById);

// Update
router.put("/:id", updateSEO);

// Delete
router.delete("/:id", deleteSEO);

module.exports = router;
