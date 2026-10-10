// .eleventy.js configuration for American Shingle Co. (1-stop-roofing.com)

module.exports = function(eleventyConfig) {
  // Passthrough static assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/sitemap.xsl": "sitemap.xsl" });

  // Custom filters
  eleventyConfig.addFilter("limit", function(arr, limit) {
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, limit);
  });

  eleventyConfig.addFilter("slugify", function(str) {
    if (!str) return "";
    return str.toString().toLowerCase().trim()
      .replace(/&/g, '-and-')
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  });

  eleventyConfig.addFilter("formatNumber", function(num) {
    if (!num) return "0";
    return Number(num).toLocaleString('en-US');
  });

  eleventyConfig.addFilter("filterByState", function(cities, stateSlug) {
    if (!Array.isArray(cities)) return [];
    return cities.filter(c => c.stateSlug === stateSlug);
  });

  eleventyConfig.addFilter("findById", function(arr, id) {
    if (!Array.isArray(arr)) return null;
    return arr.find(item => item.id === id || item.slug === id);
  });

  eleventyConfig.addFilter("jsonStringify", function(obj) {
    return JSON.stringify(obj);
  });

  const fs = require('fs');
  const path = require('path');
  const { renderCityHtml } = require('./src/edgeRenderer.js');

  eleventyConfig.setServerOptions({
    port: 8080,
    middleware: [
      function(req, res, next) {
        const cleanPath = req.url.split('?')[0].replace(/^\/|\/$/g, '');
        const parts = cleanPath.split('/');
        if (parts.length === 2) {
          const [stateSlug, citySlug] = parts;
          if (stateSlug !== 'services' && stateSlug !== 'states' && stateSlug !== 'roofing-costs' && stateSlug !== 'resources') {
            const diskFile = path.join(__dirname, 'dist', stateSlug, citySlug, 'index.html');
            if (fs.existsSync(diskFile)) {
              return next();
            }
            const html = renderCityHtml(stateSlug, citySlug);
            if (html) {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
              res.end(html);
              return;
            }
          }
        }
        next();
      }
    ]
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist"
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
