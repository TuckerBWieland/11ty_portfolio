const { exec } = require("child_process");

module.exports = function(eleventyConfig) {
  // Configure server options
  eleventyConfig.setServerOptions({
    module: "@11ty/eleventy-dev-server",
    port: 8080
  });

  // Watch CSS and config files for changes
  eleventyConfig.addWatchTarget("./src/styles/");
  eleventyConfig.addWatchTarget("./tailwind.config.js");

  // Don't copy the unprocessed CSS into the output
  eleventyConfig.ignores.add("src/styles/**/*");

  // Build Tailwind CSS after Eleventy has written output
  eleventyConfig.on("afterBuild", () => {
    console.log("Running Tailwind build...");
    return new Promise((resolve, reject) => {
      exec("npx tailwindcss -i ./src/styles/main.css -o ./_site/styles/main.css --minify", (error, stdout, stderr) => {
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

  // Copy assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  
  // Copy font files from @fontsource
  eleventyConfig.addPassthroughCopy({ 
    "node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2": "fonts/ibm-plex-mono-latin-400-normal.woff2" 
  });
  eleventyConfig.addPassthroughCopy({ 
    "node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff": "fonts/ibm-plex-mono-latin-400-normal.woff" 
  });
  eleventyConfig.addPassthroughCopy({ 
    "node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-700-normal.woff2": "fonts/ibm-plex-mono-latin-700-normal.woff2" 
  });
  eleventyConfig.addPassthroughCopy({ 
    "node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-700-normal.woff": "fonts/ibm-plex-mono-latin-700-normal.woff" 
  });

  // Copy Cloudflare Pages configuration files
  eleventyConfig.addPassthroughCopy({ "src/_config/_headers": "_headers" });
  eleventyConfig.addPassthroughCopy({ "src/_config/_redirects": "_redirects" });
  eleventyConfig.addPassthroughCopy({ "src/_config/robots.txt": "robots.txt" });

  // Copy favicon files
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "src/apple-touch-icon.png": "apple-touch-icon.png" });

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
