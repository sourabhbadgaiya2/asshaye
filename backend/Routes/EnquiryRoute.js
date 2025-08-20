const express = require("express");
const enquiryController = require("../Controller/EnquiryController");

const router = express.Router();

router.post("/add", enquiryController.ContactProduct);
router.get("/allcourse", enquiryController.ContactDisplay);
router.get("/editdisplay", enquiryController.editDisplay);
router.put("/editsave/:id", enquiryController.editDataSave);
router.delete("/coursedelte/:id", enquiryController.RecordDelete);

module.exports = router;
