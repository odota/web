const path = require('path');

module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "jest": true,
  },
  "settings": {
    "import/resolver": {
      node: {
        paths: [path.resolve(__dirname, './src')],
      },
    },
  },
  "rules": {
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
    "react/no-array-index-key": 1,
    "react/require-default-props": 0,
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
  "overrides": [
    {
      "files": ["./src/**/*.ts","./src/**/*.tsx"],
      "env": { "browser": true, "jest": true},
      "extends": [
        "airbnb",
        "plugin:@typescript-eslint/recommended",
      ],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "ecmaFeatures": { "jsx": true },
        "sourceType": "module",
        "project": "./tsconfig.json"
      },
      "plugins": ["react", "@typescript-eslint"],
      "rules": {
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "@typescript-eslint/no-inferrable-types": ["error", {"ignoreProperties": true, "ignoreParameters": false}],
        "@typescript-eslint/interface-name-prefix": ["error", { "prefixWithI": "never" }],
        'react/jsx-filename-extension': [1, { 'extensions': ['.ts', '.tsx'] }],
      },
    }
  ]
};
