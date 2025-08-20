// models/index.js
const Blog = require("../BlogModule");
const Course = require("../Coursemodule");
const Judgment = require("../JudementModule");
const Event = require("../EventModule");
const TeamMember = require("../MemberModule");
const WhatsNew = require("../WhatsModule");
const Othercourse = require("../OtherCourse/CourseModule");

const modelMap = {
  blog: Blog,
  course: Course,
  judgment: Judgment,
  event: Event,
  teammember: TeamMember,
  whatsnew: WhatsNew,
  othercourse: Othercourse,
  //   about: About,
};

module.exports = modelMap;
