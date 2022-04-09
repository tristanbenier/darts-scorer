module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'comma-dangle': [2, 'always-multiline'],
    semi: [2, 'always'],
    'vue/multi-word-component-names': 'off',
  },
};
