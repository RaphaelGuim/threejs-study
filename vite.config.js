export default {
  root: "src/",
  base: "./",
  publicDir: "../static/",

  server: {
    host: true,
  },
  build: {
    outdir: "..dist/",
    emptyOutDir: true,
    sourcemap: true,
  },
};
