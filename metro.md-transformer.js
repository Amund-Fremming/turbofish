const path = require('path');

const upstreamTransformerPath = path.join(
  path.dirname(require.resolve('expo/package.json')),
  'node_modules/@expo/metro-config/babel-transformer'
);
const upstreamTransformer = require(upstreamTransformerPath);

// Lets us `import policyText from './policy.md'` and get the raw file contents as a string.
module.exports.transform = async ({ src, filename, options }) => {
  if (filename.endsWith('.md')) {
    src = `module.exports = ${JSON.stringify(src)};`;
  }
  return upstreamTransformer.transform({ src, filename, options });
};
