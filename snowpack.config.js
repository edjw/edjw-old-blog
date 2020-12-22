module.exports = {
  mount: {
    'src/_site': { url: '/', static: true },
    "src/assets/css": { url: "/styles" }
  },
  plugins: [
    '@snowpack/plugin-postcss',

    [
      '@snowpack/plugin-run-script',
      {
        cmd: 'ELEVENTY_PRODUCTION=true eleventy',
        watch: '$1 --watch',
      },
    ],
  ],
  installOptions: {
    NODE_ENV: true,
  },
  buildOptions: {
    clean: true,
    out: 'dist',
  },
  devOptions: {
    open: 'none',
    hmrDelay: 1000,
    hmr: true
  },
  experiments: {
    optimize: {
      bundle: true,
      minify: true,
      target: 'es2020',
    },
    source: 'skypack',
  },
};
