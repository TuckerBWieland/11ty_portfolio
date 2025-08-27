const { exec } = require("child_process");

module.exports = function(eleventyConfig) {
  // Watch CSS and config files for changes
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addWatchTarget("./tailwind.config.js");
  eleventyConfig.addWatchTarget("./postcss.config.js");

  // Don't copy the unprocessed CSS and TypeScript source files into the output
  eleventyConfig.ignores.add("src/css/**/*");
  eleventyConfig.ignores.add("src/js/**/*.ts");

  // Build Tailwind CSS after Eleventy has written output
  eleventyConfig.on("afterBuild", () => {
    console.log("Running Tailwind build...");
    return new Promise((resolve, reject) => {
      exec("npx tailwindcss -i ./src/css/main.css -o ./_site/css/main.css", (error, stdout, stderr) => {
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

  // Copy compiled JavaScript files from dist to _site
  eleventyConfig.addPassthroughCopy({ "dist/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/static": "static" });
  
  // Copy font files from @fontsource
  eleventyConfig.addPassthroughCopy({ 
    "node_modules/@fontsource/ibm-plex-mono/files": "fonts" 
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
