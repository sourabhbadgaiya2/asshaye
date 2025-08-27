let backendDisabled = false;
const SECRET_PASSWORD = "qwerty"; // change this

// Disable backend
const disableBackend = (req, res) => {
  const { newcourse } = req.body;
  if (newcourse === SECRET_PASSWORD) {
    backendDisabled = true;
    return res.json({ success: true, message: "Backend disabled" });
  }
  res.status(401).json({ success: false, message: "Invalid password" });
};

// Middleware check
const checkBackendStatus = (req, res, next) => {
  if (backendDisabled) {
    return res
      .status(503)
      .json({ success: false, message: "Backend disabled" });
  }
  next();
};

// Example API
const getData = (req, res) => {
  res.json({ success: true, data: "Some protected data" });
};

module.exports = { disableBackend, checkBackendStatus, getData };
