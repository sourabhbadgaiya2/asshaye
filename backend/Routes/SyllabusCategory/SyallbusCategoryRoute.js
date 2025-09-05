const express = require("express");
const {
  getAllCategorys,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCourseBySlug,
} = require("../../Controller/SyllabusCategory/SyllabusCategory");

const router = express.Router();

router.get("/", getAllCategorys);
router.post("/", createCategory);
router.get("/slug/:slug", getCourseBySlug);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
