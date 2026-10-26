// Bundles the logo heap hero (heap-src/heap.js) into a single minified file
// at src/assets/js/heap.min.js. Run after editing the heap source:
//
//   npm run build:heap
//
// The output is committed, so the normal site build (Eleventy) does not need
// esbuild; this script is only for regenerating the bundle.
import { build } from 'esbuild';

await build({
  entryPoints: ['heap-src/heap.js'],
  bundle: true,
  minify: true,
  format: 'esm',
  target: ['es2022'],
  outfile: 'src/assets/js/heap.min.js',
  logLevel: 'info',
});
