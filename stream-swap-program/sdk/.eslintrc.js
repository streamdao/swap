module.exports = {
    ignorePatterns: ["dist/", "*.js"],
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: "tsconfig.json",
    },
    extends: ["@streamprotocol"],
    env: {
        node: true,
    },
};