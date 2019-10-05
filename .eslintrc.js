const path = require('path');

module.exports = {
  "parser": "@typescript-eslint/parser",
  "env": {
    "browser": true,
    "jest": true,
  },
  "settings": {
    "import/resolver": {
      node: {
        paths: [path.resolve(__dirname, './src')],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      },
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
  },
  "extends": [
    "airbnb",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  "plugins": [
    "@typescript-eslint",
  ],
  "rules": {
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "max-len": ["error", { "code": 180, "ignoreTemplateLiterals": true, "ignoreStrings": true }],
    "no-mixed-operators": ["error", {
      "allowSamePrecedence": true
    }],
    "no-shadow": 1,
    "import/named": ["error"],
    "jsx-a11y/anchor-is-valid": ["warn", {
      "components": ["Link"],
      "specialLink": ["to"],
    }],
    "react/jsx-filename-extension": ["error", { "extensions": [".tsx", ".jsx"] }],
    "react/no-array-index-key": 1,
    "react/require-default-props": 0,
    "import/extensions": 0,
    'import/no-extraneous-dependencies': [
      "error",
      {
        devDependencies: [
          '.storybook/**',
          'src/stories/**'
        ]
      }
    ],
    "react/sort-comp": [2],
  },
};
