module.exports = {
  env: {
    browser: true,  // Browser global variables like `window` etc.
    commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
    es6: true,      // Enable all ECMAScript 6 features except for modules.
    jest: true,     // Jest global variables like `it` etc.
    node: true,     // Defines things like process.env when generating through node
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "plugin:testing-library/react",
    "google",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  "ignorePatterns": [
    "src/static/",
    "src/utils/",
    "*.d.ts",
    "*.scss",
    ".eslintrc.*",
    "src/libs/**/*",
  ],
  root: true, // For configuration cascading.
  rules: {
    indent: [
      'error',
      2,
    ],
    "max-len": [
      "warn",
      {code: 120},
    ],
    "react/jsx-curly-spacing": [
      "warn",
      {
        allowMultiline: true,
        children: {
          when: "always",
        },
        spacing: {
          objectLiterals: "always",
        },
        when: "always",
      }
    ],
    "react/jsx-filename-extension": [
      "error",
      {extensions: [".js", ".jsx", ".ts", ".tsx"]},
    ],
    "react/jsx-indent": [
      "error",
      2,
      {
        checkAttributes: true,
        indentLogicalExpressions: true,
      },
    ],
    "react/jsx-indent-props": [
      "error",
      2,
    ],
    "react/jsx-curly-spacing": 0,
    "react/display-name": "off",
    "react/prop-types": "off",

    "testing-library/no-unnecessary-act": "off",
  },
  settings: {
    react: {
      version: "detect", // Detect react version
    }
  },
  overrides: [
    {
      files: [ "**/*.ts?(x)" ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
      },
      plugins: [
        "@typescript-eslint",
      ],
      // You can add Typescript specific rules here.
      // If you are adding the typescript variant of a rule which is there in the javascript
      // ruleset, disable the JS one.
      rules: {
          "@typescript-eslint/no-array-constructor": "warn",
          "no-array-constructor": "off",
      }
    },
    {
      files: [
        "**/*.ts?(x)",
        "**/*.js?(x)",
      ],
      rules: {
       "linebreak-style": "off",
       "no-multi-spaces": "off",
       "guard-for-in": "off",
       "require-jsdoc": "off",
       "import/no-anonymous-default-export": "off",
      // в TS и JS они работают по-разному 
       "no-unused-vars": "off",
      }
     },
  ],
};
