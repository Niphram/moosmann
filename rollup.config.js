const typescript = require("@rollup/plugin-typescript");
const dts = require("rollup-plugin-dts").default;

const external = ["moosmann", "tslib", "svelte", "svelte/store"];

const packages = ["moosmann", "moosmann-svelte"];

module.exports = packages.flatMap((package) => makeConfig({ package }));

/**
 * @param {Object} param0
 * @param {string} param0.package
 */
function makeConfig({ package }) {
    const options = {
        packageDir: `packages/${package}/`,
        input: `packages/${package}/src/index.ts`,
        output: `packages/${package}/dist`,
    };

    return [cjs(options), mjs(options), types(options)];
}

/**
 * @param {Object} param0
 * @param {string} param0.input
 * @param {string} param0.output
 * @param {string} param0.packageDir
 */
function cjs({ input, output, packageDir }) {
    return {
        input,
        external,
        output: {
            dir: output,
            format: "cjs",
            sourcemap: true,
            exports: "named",
            preserveModules: false,
            entryFileNames: "[name].js",
        },
        plugins: [typescript({ tsconfig: `${packageDir}tsconfig.json` })],
    };
}

/**
 * @param {Object} param0
 * @param {string} param0.input
 * @param {string} param0.output
 * @param {string} param0.packageDir
 */
function mjs({ input, output, packageDir }) {
    return {
        input,
        external,
        output: {
            format: "esm",
            dir: output,
            sourcemap: true,
            preserveModules: false,
            entryFileNames: "[name].esm.js",
        },
        plugins: [typescript({ tsconfig: `${packageDir}tsconfig.json` })],
    };
}

/**
 * @param {Object} param0
 * @param {string} param0.input
 * @param {string} param0.output
 * @param {string} param0.packageDir
 */
function types({ input, output, packageDir }) {
    return {
        input,
        external,
        output: {
            format: "es",
            dir: output,
        },
        plugins: [dts()],
    };
}
