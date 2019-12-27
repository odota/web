const path = require('path');

const commonRules = {
  "max-len": ["error", { "code": 180, "ignoreTemplateLiterals": true, "ignoreStrings": true }],
  "no-mixed-operators": ["error", {
    "allowSamePrecedence": true
  }],
  "no-shadow": 1,
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
  "react/jsx-fragments": "off",
  "react/jsx-curly-newline": "off",
  "react/static-property-placement": "off",
  "react/jsx-props-no-spreading": "off",
}

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
  "extends": [
    "airbnb",
  ],
  "rules": {
    ...commonRules,
    "import/named": ["error"],
    "react/state-in-constructor": "off",
    "react/destructuring-assignment": "off",
    "react/prop-types": "off",
    "react/no-access-state-in-setstate" : "off",
    "react/button-has-type": "off",
    "max-classes-per-file": 'off',
    "import/no-cycle": "off"
  },
  "overrides": [
    {
      "files": ["./src/**/*.ts","./src/**/*.tsx"],
      "env": { "browser": true, "jest": true},
      "extends": [
        "airbnb",
        "plugin:import/typescript",
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
        ...commonRules,
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "@typescript-eslint/no-inferrable-types": ["error", {"ignoreProperties": true, "ignoreParameters": false}],
        "@typescript-eslint/interface-name-prefix": ["error", { "prefixWithI": "never" }],
        "@typescript-eslint/explicit-function-return-type": "off",
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/prefer-optional-chain": "error",
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        'react/jsx-filename-extension': [1, { 'extensions': ['.ts', '.tsx'] }],
        "import/prefer-default-export": "off",
        "react/state-in-constructor": "off",
        "import/extensions": "off",
      },
    }
  ]
};
