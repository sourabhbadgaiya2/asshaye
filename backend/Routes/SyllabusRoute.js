const express = require("express");
const enquiryController = require("../Controller/SyllabusController");
const upload = require("../middlewares/multer");
const router = express.Router();

router.post("/create", enquiryController.WhatsNewSave);
router.get("/alldisplay", enquiryController.getWhatsNew);
router.get("/slug/:slug", enquiryController.getCourseBySlug);

router.delete("/delete/:id", enquiryController.WhatsNewDelete);
// router.get('/:id', enquiryController.WhatsNewById);
router.get("/category/:id", enquiryController.getCoursesByCategory);
router.get("/editdisplay", enquiryController.editDisplay);
router.put("/editsave/:id", enquiryController.editDataSave);

module.exports = router;
