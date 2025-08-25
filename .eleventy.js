const Image = require("@11ty/eleventy-img");
const htmlMinifier = require("html-minifier-terser");
const path = require("path");

module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPassthroughCopy("src/css/components");
  
  // Don't copy main CSS files directly - they should be processed by PostCSS
  // eleventyConfig.addPassthroughCopy("src/css");

  // Responsive image shortcode
  eleventyConfig.addAsyncShortcode("img", async function(src, alt, sizes) {
    if (!alt || alt.trim() === "") {
      throw new Error("Image alt text is required for accessibility");
    }

    const widths = [320, 640, 960, 1280, 1600];
    const formats = ['webp', 'jpeg'];
    
    const metadata = await Image(src, {
      widths,
      formats,
      outputDir: "_site/static/",
      urlPath: "/static/",
      filenameFormat: function(id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}.${format}`;
      }
    });

    const imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async"
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  // HTML minification in production
  if (process.env.NODE_ENV === "production") {
    eleventyConfig.addTransform("htmlmin", async function(content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        return await htmlMinifier.minify(content, {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true
        });
      }
      return content;
    });
  }

  // Directory structure
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
