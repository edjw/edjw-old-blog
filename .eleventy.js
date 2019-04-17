// RSS imports
const pluginRss = require("@11ty/eleventy-plugin-rss");
const dateToISO = require("@11ty/eleventy-plugin-rss/src/dateToISO");
const absoluteUrl = require("@11ty/eleventy-plugin-rss/src/absoluteUrl");
const htmlToAbsoluteUrls = require("@11ty/eleventy-plugin-rss/src/htmlToAbsoluteUrls");

// Reading time
const readingTime = require('eleventy-plugin-reading-time');

// Syntax Highlighting
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Date and time
const { DateTime } = require("luxon");

// Minify HTML
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {

  // Collections
  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob("posts/*.md");
  });

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Don't process folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("_includes/assets");
  eleventyConfig.addPassthroughCopy("uploads")
  eleventyConfig.addPassthroughCopy("./_headers")

  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  // Clean slugs
  eleventyConfig.addFilter("removeColonsApostrophes", slugObj => {
    return slugObj.replace(":", "").replace("'", "-").replace("--", "-");
  });

  // RSS/Atom feed filters
  eleventyConfig.addNunjucksFilter("rssLastUpdatedDate", collection => {
    if (!collection || !collection.length) {
      throw new Error("Collection is empty in rssLastUpdatedDate filter.");
    }
    // Newest date in the collection
    return dateToISO(collection[collection.length - 1].date);
  });

  eleventyConfig.addNunjucksFilter("rssDate", dateObj => dateToISO(dateObj));

  eleventyConfig.addNunjucksFilter("absoluteUrl", (href, base) => absoluteUrl(href, base));

  eleventyConfig.addNunjucksAsyncFilter("htmlToAbsoluteUrls", (htmlContent, base, callback) => {
    if (!htmlContent) {
      callback(null, "");
      return;
    }

    htmlToAbsoluteUrls(htmlContent, base).then(result => {
      callback(null, result.html);
    });
  });

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath.indexOf(".html") > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        cssmin: true,
        jsmin: true
      });
      return minified;
    }
    return content;
  });


  /* Markdown Plugins */
  // let markdownIt = require("markdown-it");
  // let markdownItAnchor = require("markdown-it-anchor");
  // let options = {
  //   html: true,
  //   breaks: true,
  //   linkify: true
  // };
  // let opts = {
  //   permalink: false
  // };

  // eleventyConfig.setLibrary("md", markdownIt(options)
  //   .use(markdownItAnchor, opts)
  // );

  return {
    // templateFormats: ["md", "njk", "html", "css", "js"],

    // markdownTemplateEngine: "njk",
    // htmlTemplateEngine: "njk",
    // dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
