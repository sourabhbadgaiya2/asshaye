const express = require("express");
const Blog = require("../Module/BlogModule.js");
const Course = require("../Module/Coursemodule.js");
const Event = require("../Module/EventModule.js");
const Judgment = require("../Module/JudementModule.js");
const TeamMember = require("../Module/MemberModule.js");
const WhatsNew = require("../Module/WhatsModule.js");
const SyllabusCategory = require("../Module/SyllabusCategoryModule.js");

const router = express.Router();

// console.log(process.env.PUBLIC_SITE_URL)

router.get("/sitemap.xml", async (req, res) => {
  try {
    const BASE = process.env.PUBLIC_SITE_URL || "http://localhost:5173";

    // 1) ✅ Static URLs (saare pages jo aapne diye)
    const staticUrls = [
      { loc: "/", changefreq: "daily", priority: 1.0 },
      { loc: "/courses-grid-view", changefreq: "weekly", priority: 0.7 },
      { loc: "/courses-list-view", changefreq: "weekly", priority: 0.7 },
      { loc: "/judgements", changefreq: "weekly", priority: 0.7 },
      { loc: "/judgements-details", changefreq: "weekly", priority: 0.7 },
      { loc: "/foundation", changefreq: "weekly", priority: 0.7 },
      { loc: "/about-institute", changefreq: "yearly", priority: 0.5 },
      { loc: "/about-director", changefreq: "yearly", priority: 0.5 },
      { loc: "/why-aashayein-judiciary", changefreq: "yearly", priority: 0.5 },
      { loc: "/directors-message", changefreq: "yearly", priority: 0.5 },
      { loc: "/success-stories", changefreq: "monthly", priority: 0.6 },
      { loc: "/online-classes", changefreq: "monthly", priority: 0.6 },
      { loc: "/judicial-services", changefreq: "yearly", priority: 0.5 },
      { loc: "/judicial-bihar", changefreq: "yearly", priority: 0.5 },
      { loc: "/himanchal-haryana", changefreq: "yearly", priority: 0.5 },
      { loc: "/jharkhand-perlims", changefreq: "yearly", priority: 0.5 },
      { loc: "/event", changefreq: "weekly", priority: 0.6 },
      { loc: "/event-details", changefreq: "weekly", priority: 0.6 },
      { loc: "/team-members", changefreq: "monthly", priority: 0.6 },
      { loc: "/faqs", changefreq: "yearly", priority: 0.5 },
      { loc: "/blog", changefreq: "weekly", priority: 0.7 },
      { loc: "/blog-with-sidebar", changefreq: "weekly", priority: 0.6 },
      { loc: "/contact", changefreq: "yearly", priority: 0.5 },
      { loc: "/enquiry", changefreq: "yearly", priority: 0.5 },
      { loc: "/privacy", changefreq: "yearly", priority: 0.5 },
      { loc: "/details", changefreq: "monthly", priority: 0.6 },
      { loc: "/testseries", changefreq: "monthly", priority: 0.6 },
      { loc: "/mainseries", changefreq: "monthly", priority: 0.6 },
      { loc: "/otherseries", changefreq: "monthly", priority: 0.6 },
      { loc: "/courses", changefreq: "weekly", priority: 0.7 },
      { loc: "/course-layout-one", changefreq: "monthly", priority: 0.6 },
      { loc: "/othercourse", changefreq: "monthly", priority: 0.6 },
    ];

    // 2) ✅ Dynamic URLs (DB se fetch)
    const [blogs, courses, events, judgments, team, whatsNew] =
      await Promise.all([
        Blog.find().select("blogUrl updatedAt createdAt").lean(),
        Course.find().select("staticUrl updatedAt createdAt").lean(),
        Event.find().select("staticUrl updatedAt createdAt").lean(),
        Judgment.find().select("staticUrl updatedAt createdAt").lean(),
        TeamMember.find().select("staticUrl updatedAt createdAt").lean(),
        WhatsNew.find().select("staticUrl updatedAt createdAt").lean(),
        SyllabusCategory.find().select("staticUrl updatedAt createdAt").lean(),
      ]);

    const toUrls = (items, prefix, opts = {}) => {
      if (!items || !Array.isArray(items)) {
        console.log("⚠️ items invalid hain:", items);
        return [];
      }

      //   console.log(`📌 ${prefix} me ${items.length} items mile`);

      return items.map((i) => {
        // console.log("👉 Raw item:", i);

        return {
          loc: `${prefix}/${i.staticUrl || i.blogUrl}`,
          lastmod: (i.updatedAt || i.createdAt || new Date()).toISOString(),
          changefreq: opts.changefreq || "weekly",
          priority: opts.priority ?? 0.7,
        };
      });
    };

    const dynamicUrls = [
      ...toUrls(blogs, "/blog-details"),
      ...toUrls(courses, "/course"),
      ...toUrls(events, "/event-details"),
      ...toUrls(judgments, "/judgements"),
      ...toUrls(team, "/team-member-details"),
      ...toUrls(whatsNew, "/whats-new-detail"),
      ...toUrls(SyllabusCategory, "/syllabus"),
    ];

    // 3) Merge static + dynamic
    const all = [
      ...staticUrls.map((u) => ({ ...u, loc: `${BASE}${u.loc}` })),
      ...dynamicUrls.map((u) => ({ ...u, loc: `${BASE}${u.loc}` })),
    ];

    // 4) Generate XML
    const xml =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      all
        .map(
          (u) => ` <url>
                   <loc>${u.loc}</loc>
                   ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ``}
                   <changefreq>${u.changefreq}</changefreq>
                   <priority>${u.priority}</priority>
                   </url>`
        )
        .join("\n") +
      `\n</urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).send(xml);
  } catch (err) {
    console.error("Sitemap error:", err);
    res.status(500).send("Failed to generate sitemap.");
  }
});

module.exports = router;
