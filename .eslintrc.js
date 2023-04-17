module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:vue/recommended',
    'prettier'
  ],
  plugins: ['jest'],
  // add your custom rules here
  rules: {
    'vue/no-v-html': 'off'
  }
}
