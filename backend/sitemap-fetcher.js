// // backend/sitemap-fetcher.js
// const axios = require("axios");
// const { parseStringPromise } = require("xml2js");

// async function fetchSitemapUrls(sitemapUrl) {
//   const response = await axios.get(sitemapUrl);
//   const xml = response.data;
//   const result = await parseStringPromise(xml);
//   return result.urlset.url.map((u) => u.loc[0]);
// }

// // Use: example ----
// fetchSitemapUrls("http://localhost:8000/sitemap.xml").then((urls) => {
//   console.log(urls); // All page URLs from sitemap.xml!
// });

const axios = require("axios");
const { parseStringPromise } = require("xml2js");

async function fetchSitemapUrls(sitemapUrl) {
  try {
    // Step 1: Sitemap XML fetch karo
    const response = await axios.get(sitemapUrl);
    const xmlData = response.data;

    // Step 2: XML ko JS object me parse karo
    const parsedXml = await parseStringPromise(xmlData);

    // Step 3: Sitemap standard format se URLs nikaalo
    // Usually URLs <urlset><url><loc>URL</loc></url></urlset> form me hoti hain
    const urls = parsedXml.urlset.url.map((u) => u.loc[0]);

    return urls; // URLs ka array return hota hai
  } catch (error) {
    console.error("Error fetching or parsing sitemap:", error);
    return [];
  }
}

module.exports = fetchSitemapUrls;
