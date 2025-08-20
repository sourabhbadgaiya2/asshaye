// This map links a model name to its URL slug field and base path
const modelConfig = {
  blog: { urlField: "blogUrl", basePath: "/blog-details" },
  course: { urlField: "staticUrl", basePath: "/course-details" },
  judgment: { urlField: "judgmentUrl", basePath: "/Judgement-Details" }, // example
  event: { urlField: "eventUrl", basePath: "/event-details" }, // example
  // Add other models here
};

module.exports = modelConfig;
