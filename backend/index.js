const express = require("express");

const app = express();
const path = require("path");
const dbconnect = require("./Utils/db.config");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(morgan("tiny"));

require("dotenv").config();
app.use(cors());
// app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

dbconnect();
app.use(fileUpload());

const QueryRoutes = require("./Routes/QueryRoutes");
const BannerRoutes = require("./Routes/BannerRoute");
const CourseRoute = require("./Routes/CourseRoute");
const AllSuccessRoute = require("./Routes/SucessRoute");
const categoryRouter = require("./Routes/CategoryRoute");
const EnquiryRoute = require("./Routes/EnquiryRoute");
const ContactRoute = require("./Routes/ContactRoute");
const EnrollRoute = require("./Routes/EnrollRoute");
const WhatsRoute = require("./Routes/WhatsNewRoute");
const BlogRoute = require("./Routes/BlogRoute");
const MemberRoute = require("./Routes/MemberRoute");
const ChooseRoute = require("./Routes/ChooseRoute");
const SyllabusRoute = require("./Routes/SyllabusRoute");
const RegisterRoute = require("./Routes/RegisterRoute");
const TestRoute = require("./Routes/testRoute");
const MainRoute = require("./Routes/MainRoute");
const CallbackRoute = require("./Routes/CallbackPopUp");
const JudementRoute = require("./Routes/judementRoute");
const EventRoute = require("./Routes/EventRoute");
const controlRoutes = require("./Routes/Courses");
const URLRoute = require("./Routes/URLRoute");
const AdminRoute = require("./Routes/Admin/AdminRoute");
const subacategoryRouter = require("./Routes/subcategory.routes");
const judementRouter = require("./Routes/JudementRoute/judementRoute");
const blogRouter = require("./Routes/BlogCategoryRoute");
const DiscountRoute = require("./Routes/DiscountRoute");
const FAQRoute = require("./Routes/FAQ/faqRoute");
const subsubRoute = require("./Routes/subsubRoute");
const syllabusRoute = require("./Routes/SyllabusCategory/SyallbusCategoryRoute");
const RefundRoute = require("./Routes/Refundpolicy/RefundRoute");
const dynamicRoute = require("./Routes/DynamicRoute/DynamicRoute");
const OtherCourse = require("./Routes/OtherRoute/OtherRoute");
const SocialRoute = require("./Routes/SocialMedia/SocailRoute");
const PlayStoreRoute = require("./Routes/PlayStoreRoute/PlayStoreRoute");
const seoRoutes = require("./Routes/seo/seoRoutes");
const fetchSitemapUrls = require("./sitemap-fetcher");

const generateSitemap = require("./sitemap-generator");
const sitemapRouter = require("./Routes/sitemap.route");

// app.use("/uploads", express.static("uploads"));
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let PORT = process.env.PORT || 8000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/", sitemapRouter);
app.use("/api/blog-seo", require("./Routes/seo/blogSeo"));

app.use("/api/seo", seoRoutes);
app.use("/query", QueryRoutes);
app.use("/banner", BannerRoutes);
app.use("/api", CourseRoute);
app.use("/success", AllSuccessRoute);
app.use("/api/blog", controlRoutes);
app.use("/category", categoryRouter);
app.use("/judementcategory", judementRouter);
app.use("/blogcategory", blogRouter);

app.use("/subcategory", subacategoryRouter);
app.use("/enquiry", EnquiryRoute);
app.use("/contact", ContactRoute);
app.use("/enroll", EnrollRoute);
app.use("/whatsnew", WhatsRoute);
app.use("/blog", BlogRoute);
app.use("/member", MemberRoute);
app.use("/choose", ChooseRoute);
app.use("/syllabus", SyllabusRoute);
app.use("/register", RegisterRoute);
app.use("/test", TestRoute);
app.use("/main", MainRoute);
app.use("/Callback", CallbackRoute);
app.use("/judement", JudementRoute);
app.use("/event", EventRoute);
app.use("/url", URLRoute);
app.use("/admin", AdminRoute);
app.use("/discount", DiscountRoute);
app.use("/faq", FAQRoute);
app.use("/subsubcategory", subsubRoute);
app.use("/syllabuscategory", syllabusRoute);
app.use("/refund", RefundRoute);
app.use("/dynamics", dynamicRoute);
app.use("/othercourse", OtherCourse);
app.use("/social", SocialRoute);
app.use("/playstore", PlayStoreRoute);

app.get("/api/sitemap-urls", async (req, res) => {
  const urls = await fetchSitemapUrls(
    "https://backend.aashayeinjudiciary.com/sitemap.xml"
  );
  console.log("Sitemap URLs:", urls);
  // res.json({ urls });
});

const fs = require("fs");

const generateAndSaveSitemap = async () => {
  const xml = await generateSitemap();
  if (xml) {
    fs.writeFileSync("public/sitemap.xml", xml);
    console.log("Sitemap updated!");
  }
};

// इसे सर्वर start होने पर call करें
generateAndSaveSitemap();
// और फिर हर 24 घंटे में call करने के लिए एक cron job या setInterval का उपयोग करें
setInterval(generateAndSaveSitemap, 86400000); // 24 hours

app.get("/sitemap.xml", async (req, res) => {
  const xml = await generateSitemap();

  if (xml) {
    res.header("Content-Type", "application/xml");
    res.send(xml);
  } else {
    res.status(500).send("Error generating sitemap");
  }
});

app.listen(PORT, function (error) {
  if (error) throw error;
  console.log("Server created Successfully on PORT: ", PORT);
});
