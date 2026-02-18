/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://primeworldmedia.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,

  robotsTxtOptions: {
    additionalSitemaps: [
      "https://primeworldmedia.com/sitemap.xml",
    ],
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },

  exclude: ["/admin/*", "/api/*"],
};
