let env = process.env.ELEVENTY_ENV;

// RSS imports
const pluginRss = require("@11ty/eleventy-plugin-rss");
const dateToISO = require("@11ty/eleventy-plugin-rss/src/dateToISO");
const absoluteUrl = require("@11ty/eleventy-plugin-rss/src/absoluteUrl");
const htmlToAbsoluteUrls = require("@11ty/eleventy-plugin-rss/src/htmlToAbsoluteUrls");

// Minify CSS
const CleanCSS = require("clean-css");

// Minify JS
const Terser = require("terser");

// Reading time
const readingTime = require("eleventy-plugin-reading-time");

// Date and time
const { DateTime } = require("luxon");

// Minify HTML
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {

	let markdownIt = require("markdown-it");
	let markdownItFootnote = require("markdown-it-footnote");
	let options = {
		html: true,
		breaks: true,
		linkify: true
	};
	let markdownLib = markdownIt(options).use(markdownItFootnote);

	eleventyConfig.setLibrary("md", markdownLib);

	// Collections
	eleventyConfig.addCollection("posts", (collection) => {
		return collection.getFilteredByGlob("posts/*.md");
	});

	// Plugins
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(readingTime);

	// Copy over folders with static assets e.g. images
	eleventyConfig.addPassthroughCopy("admin");
	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.addPassthroughCopy("uploads");
	eleventyConfig.addPassthroughCopy("_headers");
	eleventyConfig.addPassthroughCopy({ "assets/internal_images/favicons": "/" });

	// Date formatting (human readable)
	eleventyConfig.addFilter("readableDate", dateObj => {
		return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
	});

	// Date formatting (machine readable)
	eleventyConfig.addFilter("machineDate", dateObj => {
		return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
	});

	eleventyConfig.addNunjucksFilter("ISO_8601_Date", dateObj => dateObj.toISOString());

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
	});

	// Clean slugs
	eleventyConfig.addFilter("removeColonsApostrophes", slugObj => {
		return slugObj.replace(":", "").replace("'", "-").replace("--", "-").replace("(", "").replace(")", "").replace('"', "").replace("'", "");
	});

	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
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

	eleventyConfig.addFilter("getDomain", function (url) {
		return new URL(url).hostname;
	});

	if (env === "production") {
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
	}

	eleventyConfig.addFilter("jsmin", function (code) {
		let minified = Terser.minify(code);
		if (minified.error) {
			console.log("Terser error: ", minified.error);
			return code;
		}

		return minified.code;
	});

	return {
		passthroughFileCopy: true,
		dir: {
			input: ".",
			includes: "_includes",
			data: "_data",
			output: "_site"
		},
		templateFormats: ["njk", "md"],
		htmlTemplateEngine: "njk",
	};
}
