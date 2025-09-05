const express = require("express");
const router = express.Router();
const courseController = require("../../Controller/OtherCourse/CourseController"); // Adjust the path

// CRUD routes
router.post("/", courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/slug/:slug", courseController.getCourseBySlug);
router.get("/:id", courseController.getCourseById);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);
router.get("/deatail/:id", courseController.getProductById);

// Custom routes
router.get("/semester/:semester", courseController.getCoursesBySemester);

module.exports = router;
