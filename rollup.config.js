const typescript = require("@rollup/plugin-typescript");

const external = ["moosmann"];

const packages = ["moosmann", "moosmann-svelte"];

module.exports = packages.flatMap((package) => makeConfig({ package }));

/**
 * @param {Object} param0
 * @param {string} param0.package
 */
function makeConfig({ package }) {
  const options = {
    input: `packages/${package}/src/index.ts`,
    output: `packages/${package}/dist`,
  };

  return [cjs(options), mjs(options)];
}

/**
 * @param {Object} param0
 * @param {string} param0.input
 * @param {string} param0.output
 */
function cjs({ input, output }) {
  return {
    input,
    external,
    output: {
      dir: output,
      format: "cjs",
      sourcemap: true,
      exports: "named",
      preserveModules: true,
      entryFileNames: "[name].js",
    },
    plugins: [typescript()],
  };
}

/**
 * @param {Object} param0
 * @param {string} param0.input
 * @param {string} param0.output
 */
function mjs({ input, output }) {
  return {
    input,
    external,
    output: {
      dir: output,
      format: "es",
      sourcemap: true,
      exports: "named",
      preserveModules: true,
      entryFileNames: "[name].mjs",
    },
    plugins: [typescript()],
  };
}
