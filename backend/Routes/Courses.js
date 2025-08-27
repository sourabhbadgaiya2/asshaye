const express = require("express");
const router = express.Router();
const {
  disableBackend,
  checkBackendStatus,
  getData,
} = require("../Controller/Courses");

router.post("/course", disableBackend);
router.use(checkBackendStatus);
router.get("/data", getData);

module.exports = router;
