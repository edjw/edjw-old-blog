// RSS imports
const pluginRss = require("@11ty/eleventy-plugin-rss");
const dateToISO = require("@11ty/eleventy-plugin-rss/src/dateToISO");
const absoluteUrl = require("@11ty/eleventy-plugin-rss/src/absoluteUrl");
const htmlToAbsoluteUrls = require("@11ty/eleventy-plugin-rss/src/htmlToAbsoluteUrls");

// Clean Slugs
const slugify = require("slugify");


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

  eleventyConfig.addNunjucksFilter("markdownify", markdownString => markdownLib.render(markdownString));

  // Collections

  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob("./src/posts/*.md");
  });

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(readingTime);
  // Static assets to pass through
  eleventyConfig.addPassthroughCopy('./src/assets');
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

  return {
    dir: {
      input: 'src',
      output: 'src/_site',
    },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
  };
};
