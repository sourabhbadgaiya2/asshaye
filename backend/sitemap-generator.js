const sitemap = require("sitemap");
const Course = require("./Module/Coursemodule");
const Blog = require("./Module/BlogModule");

const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");

const generateSitemap = async () => {
  try {
    const courses = await Course.find({}); // डेटाबेस से सभी courses fetch करें
    const blogs = await Blog.find({}); // डेटाबेस से सभी blogs fetch करें

    const links = [
      { url: "/", changefreq: "daily", priority: 1.0 },
      { url: "/courses", changefreq: "weekly", priority: 0.9 },
      { url: "/blogs", changefreq: "weekly", priority: 0.9 },
      { url: "/contact", changefreq: "monthly", priority: 0.7 },
      // आप यहाँ अपनी वेबसाइट के सभी static pages जोड़ सकते हैं
    ];

    // Dynamic courses URLs को जोड़ें
    courses.forEach((course) => {
      if (course.staticUrl) {
        const slug = course.staticUrl
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
        links.push({
          url: `/course-details/${slug}`,
          changefreq: "weekly",
          priority: 0.8,
        });
      }
    });

    // Dynamic blogs URLs को जोड़ें
    blogs.forEach((blog) => {
      if (blog.blogUrl) {
        const slug = blog.blogUrl
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
        links.push({
          url: `/blog-details/${slug}`,
          changefreq: "weekly",
          priority: 0.8,
        });
      }
    });

    // Create a stream to write to
    const stream = new SitemapStream({
      hostname: "https://aashayeinjudiciary.com", // यहाँ अपना domain name डालें
    });

    // Pipe your links to the stream
    const readable = Readable.from(links);
    readable.pipe(stream);

    // Return the promise to get the XML
    const xml = await streamToPromise(stream);
    return xml.toString();
  } catch (error) {
    console.error("Sitemap generation failed:", error);
    return null;
  }
};

module.exports = generateSitemap;
