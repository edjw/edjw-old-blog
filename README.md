# Ed Johnson-Williams' blog

[https://edjohnsonwilliams.co.uk](https://edjohnsonwilliams.co.uk/)

Built on Eleventy and Netlify CMS


## Available Scripts

### Development

```bash
# runs the app in the development mode.
npm run dev
```

Open http://localhost:8080 to view it in the browser.

The page will reload if you make file changes.

### Production

To increase the production performance builds are optimized via
[@snowpack/plugin-optimize](https://github.com/pikapkg/snowpack/tree/master/plugins/plugin-optimize).

```bash
# builds a static copy of your site to the `dist/` folder.
npm run build
```

```bash
# serve the content from the `dist/` folder.
npm run serve
```

Open http://localhost:8080 to view it in the browser.

Your code is now ready to be deployed!

### Add some Netlify helpers

Netlify Dev adds the ability to use Netlify redirects, proxies, and serverless functions.

```bash
# install the Netlify CLI in order to get netlify dev
npm install -g netlify-cli

# run a local server with some added Netlify sugar
netlify dev
```

