const express = require('express');
const enquiryController = require('../Controller/WhatsNewController');
const upload = require("../middlewares/multer");
const router = express.Router();


router.post('/create',  enquiryController.WhatsNewSave);
router.get('/alldisplay', enquiryController.getWhatsNew);
router.get("/editdisplay", enquiryController.editDisplay);
router.get("/slug/:slug", enquiryController.getCourseBySlug);
router.put("/editsave/:id", enquiryController.editDataSave)
router.delete('/delete/:id', enquiryController.WhatsNewDelete);

router.get('/:id', enquiryController.WhatsNewById);

module.exports = router;