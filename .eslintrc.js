// For more on configuring, see: https://eslint.org/docs/6.0.0/user-guide/configuring
module.exports = {
  env: {
    browser: true, // adds browser gloabl envs
    commonjs: true, // CommonJS variables & scoping for use w/ WebPack
    es2020: true, // adds ECMAscript2020 globals & sets `parserOptions.ecmaVersion: 11`
    jest: true, // jest globals for testing!
  },

  // NOTE: some of eslint:recommended's rules are turned off in typescript-eslint/recommended
  // and replaced with variations from typescript-eslint that are more complete/accurate
  // For example: `no-return-await`
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // for using the new JSX transform from React 17
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],

  // This allows ESLint to work well w/ TypeScript syntax
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    // @typescript-eslint/parser requires project to include tsconfig.json because some rules need type information
    // ^kudos Steven Berlan!
    // https://github.com/prettier/prettier-eslint/issues/201#issuecomment-901299351
    // NOTE: left out sourceType: module is intentionally since things seemed fine w/o it
    project: ['tsconfig.json'],
  },

  plugins: ['react', 'import', '@typescript-eslint'],

  // Don't look in parent directories for other eslint configs for consistent results
  // for more, see: https://eslint.org/docs/6.0.0/user-guide/configuring#configuration-cascading-and-hierarchy
  root: true,

  /**
   * NOTE:
   * Some rules used to exist but were removed to allow eslint and prettier
   * to play well together:
   * - @typescript-eslint/no-extra-semi
   * - no-mixed-spaces-and-tabs
   * - semi
   */
  rules: {
    'no-alert': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-undef': 'off',

    // Allow using both `interface` and `type`
    '@typescript-eslint/consistent-type-definitions': 'off',

    // Allow unused vars leading with _
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],

    // Guard against cyclical dependencies
    'import/no-cycle': 'error',

    // Turn off prop-types since TypeScript can cover that
    // Additionally, to avoid annoying silly issues like using React.FC
    // and seeing "children is missing in props validation"
    // for more: https://github.com/jsx-eslint/eslint-plugin-react/issues/2353
    'react/prop-types': 'off',

    // Kudos to Steven Berlan for the rules here on out!!

    // Return PromiseLike<T> in a try has unexpected semantics (doesn't resolve inside try).
    // For better stack tracing, always `return await`!
    'no-return-await': 'off',
    '@typescript-eslint/return-await': ['error', 'always'],

    // Deal with likely misused promises, but don't worry about void function returns getting a promise<void>
    // due to async () => {}
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          arguments: false,
          attributes: false,
        },
      },
    ],
  },

  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },
};
