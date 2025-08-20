const express = require("express");
const route = express.Router();
const CourseController = require("../Controller/CourseController");

const UserModel = require("../Module/QueryModule");
const Course = require("../Module/Coursemodule");

route.post("/course", CourseController.CourseSave);
route.get("/allcourse", CourseController.getAllCourse);

route.get("/alldisplay", CourseController.getAllCoursedisplay);

// routes/courseRoutes.js
route.get("/filter", async (req, res) => {
  try {
    const { category, subCategory, subSubCategory } = req.query;
    console.log(subSubCategory, "LLLL");

    const filter = {};
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (subSubCategory) filter.subsubCategory = subSubCategory; // Corrected field name

    const courses = await Course.find(filter)
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory");

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

route.get("/editdisplay", CourseController.editDisplay);
route.get("/:id", CourseController.getProductById);
route.get("/getdata/:id", CourseController.getsubcategory);

route.delete("/coursedelte/:id", CourseController.CourseDelete);
route.get("/courses/:id", CourseController.getCourseById);
route.get("/courses/category/:id", CourseController.getCoursesByCategory);
route.put("/editsave/:id", CourseController.editDataSave);
route.post("/:id", CourseController.getAllCourseHome);
route.put("/:id/home-visibility", CourseController.getproducthome);
route.get("/getrecordedcourse/:id", CourseController.getrecorededcourse);

route.get("/slug/:slug", CourseController.getCourseBySlug);

module.exports = route;
