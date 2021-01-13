// RSS imports
const pluginRss = require("@11ty/eleventy-plugin-rss");
const dateToISO = require("@11ty/eleventy-plugin-rss/src/dateRfc3339");
const absoluteUrl = require("@11ty/eleventy-plugin-rss/src/absoluteUrl");
const htmlToAbsoluteUrls = require("@11ty/eleventy-plugin-rss/src/htmlToAbsoluteUrls");

// Clean Slugs
const slugify = require("slugify");

// Minify HTML
const htmlmin = require("html-minifier");

// Reading time
const readingTime = require("eleventy-plugin-reading-time");

// Date and time
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  let markdownIt = require("markdown-it");
  let markdownItFootnote = require("markdown-it-footnote");
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };
  let markdownLib = markdownIt(options).use(markdownItFootnote);

  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addNunjucksFilter("markdownify", (markdownString) =>
    markdownLib.render(markdownString)
  );

  // Collections

  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob("./src/posts/*.md");
  });

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(readingTime);
  // Static assets to pass through
  eleventyConfig.addPassthroughCopy("./src/assets/images");
  eleventyConfig.addPassthroughCopy("./src/assets/internal_images");
  // Copy over folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/uploads");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy({
    "./src/assets/internal_images/favicons": "/",
  });

  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("dd MMMM yyyy");
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  eleventyConfig.addFilter("getYear", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy");
  });

  eleventyConfig.addNunjucksFilter("ISO_8601_Date", (dateObj) =>
    dateObj.toISOString()
  );

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Clean slugs
  eleventyConfig.addFilter("cleanUpSlug", (slugObj) => {
    return slugify(slugObj, {
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: true,
    });
  });
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addNunjucksFilter("decodeBase64", (b64string) => {
    return Buffer.from(b64string, "base64").toString("utf-8");
  });

  // RSS/Atom feed filters
  eleventyConfig.addNunjucksFilter("rssLastUpdatedDate", (collection) => {
    if (!collection || !collection.length) {
      throw new Error("Collection is empty in rssLastUpdatedDate filter.");
    }
    // Newest date in the collection
    return dateToISO(collection[collection.length - 1].date);
  });

  eleventyConfig.addNunjucksFilter("rssDate", (dateObj) => dateToISO(dateObj));

  eleventyConfig.addNunjucksFilter("absoluteUrl", (href, base) =>
    absoluteUrl(href, base)
  );

  eleventyConfig.addNunjucksAsyncFilter(
    "htmlToAbsoluteUrls",
    (htmlContent, base, callback) => {
      if (!htmlContent) {
        callback(null, "");
        return;
      }

      htmlToAbsoluteUrls(htmlContent, base).then((result) => {
        callback(null, result.html);
      });
    }
  );

  eleventyConfig.addFilter("getDomain", function (url) {
    return new URL(url).hostname;
  });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  return {
    dir: {
      input: "src",
      output: "src/_site",
    },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
  };
};
