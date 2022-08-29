module.exports = {
  // Extend the base configuration
  extends: ['./.eslintrc.js'],

  // Ensure no code for debugging or exploration was left in
  rules: {
    'no-alert': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
};
