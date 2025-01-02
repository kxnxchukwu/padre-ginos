import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import pluginQuery from "@tanstack/react-query-devtools";

/** @type {import('eslint').Linter.Config[]} */

export default [
  js.configs.recommended,
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  reactPlugin.configs.flat["jsx-runtime"],
  ...pluginQuery.configs["flat/recommended"],
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    parserOptions: {
      ecmaVersion: 2022,
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      "react/no-unescape-entities": "off",
      "react/prop-types": "off",
    },
  },
  prettier,
];
