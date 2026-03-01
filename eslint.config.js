const js = require("@eslint/js");
const prettierPlugin = require("eslint-plugin-prettier");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,

  // Node files (webpack + config files)
  {
    files: ["webpack.config.js", "eslint.config.js"],

    languageOptions: {
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        process: "readonly",
      },
    },
  },

  // Browser source code
  {
    files: ["src/**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        fetch: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
      },
    },

    plugins: {
      prettier: prettierPlugin,
    },

    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": "error",
    },
  },
];
