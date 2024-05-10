/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  plugins: ['react', '@typescript-eslint', 'prettier', "jest"],
  extends: ["@repo/eslint-config/next.js", "next", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  env: {
    "jest/globals": true,
  },
  rules: {
    "no-unused-vars": "off",
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  }
};
