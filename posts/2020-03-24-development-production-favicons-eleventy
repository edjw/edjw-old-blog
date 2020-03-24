---
title: Development and Production favicons in Eleventy
date: 2020-03-24T14:45:00.000Z
socialDescription: Here's how to have different favicons for dev and prod in 11ty
---

*CSS Tricks* has an article up about [using a different favicon for local development and production](https://css-tricks.com/different-favicon-for-development). That way, when you've got both open, you can easily tell the difference.

## Production and development favicons in Eleventy

Here's a way to do this in Eleventy.

Have two folders for your site's favicons. Keep your favicons for production in one folder. And keep your favicons for development in the other folder.

Set the `ELEVENTY_ENV` environment variable in the scripts section of your `package.json`. Set `ELEVENTY_ENV` to "dev" when you're in development and using `eleventy --serve`. Set it to "prod" for the build script.

```json
// package.json

"scripts": {
    "dev": "ELEVENTY_ENV=dev eleventy --serve",
    "build": "ELEVENTY_ENV=prod eleventy"
}
```

In your `eleventy.js` file, get the `ELEVENTY_ENV` variable. Then, if it's "prod", pass through your production favicons. If it's "dev", pass through your development icons.

```js
//.eleventy.js

module.exports = function (eleventyConfig) {
    let env = process.env.ELEVENTY_ENV;

    if (env === "prod") {
        eleventyConfig.addPassthroughCopy({ "./src/site/assets/images/favicons_prod": "/" });
    }
    else if (env === "dev") {
        eleventyConfig.addPassthroughCopy({ "./src/site/assets/images/favicons_dev": "/" });
    }
}
```
