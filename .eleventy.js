const { exec } = require("child_process");

module.exports = function(eleventyConfig) {
  // Configure server options to fix MIME type issues
  eleventyConfig.setServerOptions({
    module: "@11ty/eleventy-dev-server",
    port: 8080,
    middleware: [
      function(req, res, next) {
        if (req.url.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
        next();
      }
    ]
  });

  // Watch CSS and config files for changes
  eleventyConfig.addWatchTarget("./src/styles/");
  eleventyConfig.addWatchTarget("./tailwind.config.js");
  eleventyConfig.addWatchTarget("./postcss.config.js");
  eleventyConfig.addWatchTarget("./src/scripts/");

  // Don't copy the unprocessed CSS and TypeScript source files into the output
  eleventyConfig.ignores.add("src/styles/**/*");
  eleventyConfig.ignores.add("src/scripts/**/*.ts");

  // Build TypeScript before Eleventy runs
  eleventyConfig.on("beforeBuild", () => {
    console.log("Running TypeScript build...");
    return new Promise((resolve, reject) => {
      exec("tsc", (error, stdout, stderr) => {
        if (error) {
          console.error("TypeScript build error:", stderr);
          reject(error);
        } else {
          console.log(stdout);
          resolve();
        }
      });
    });
  });

  // Rebuild TypeScript on watched changes
  eleventyConfig.on("beforeWatch", () => {
    exec("tsc");
  });

  // Build Tailwind CSS after Eleventy has written output
  eleventyConfig.on("afterBuild", () => {
    console.log("Running Tailwind build...");
    return new Promise((resolve, reject) => {
      exec("npx tailwindcss -i ./src/styles/main.css -o ./_site/styles/main.css", (error, stdout, stderr) => {
        if (error) {
          console.error("Tailwind build error:", stderr);
          reject(error);
        } else {
          console.log(stdout);
          resolve();
        }
      });
    });
  });

  // Copy compiled JavaScript files and assets
  eleventyConfig.addPassthroughCopy({ "dist/scripts": "scripts" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  
  // Copy font files from @fontsource
  eleventyConfig.addPassthroughCopy({ 
    "node_modules/@fontsource/ibm-plex-mono/files": "fonts" 
  });

  // Copy Cloudflare Pages configuration files
  eleventyConfig.addPassthroughCopy({ "src/_config/_headers": "_headers" });
  eleventyConfig.addPassthroughCopy({ "src/_config/_redirects": "_redirects" });
  eleventyConfig.addPassthroughCopy({ "src/_config/robots.txt": "robots.txt" });

  // Copy favicon files to site root
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");

  return {
    dir: {
      input: "src",
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
