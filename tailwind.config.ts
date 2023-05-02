import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {},
  plugins: [require('@tailwindcss/forms')],
  content: ['src/**/*.{ts,js,vue}', 'nuxt.config.js']
}
