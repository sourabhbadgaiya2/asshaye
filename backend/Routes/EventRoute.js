const express = require("express");
const router = express.Router();
const ContactController = require("../Controller/EventController");

router.post("/", ContactController.ContactSave);
router.get("/", ContactController.getAllContacts);
router.get("/:id", ContactController.getContactById);
// router.put('/:id', ContactController.updateContact);
router.delete("/:id", ContactController.deleteContact);
router.get("/event/:id", ContactController.getCourseById);
router.get("/slug/:slug", ContactController.getCourseBySlug);

router.get("/editdisplay", ContactController.editDisplay);
router.put("/editsave/:id", ContactController.editDataSave);

module.exports = router;
