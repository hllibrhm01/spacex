/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://spacex-one.vercel.app",
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false,
}
