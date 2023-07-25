import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontSize: {
        xxs: '0.5rem'
      }
    },
    fill: ({ theme }) => ({
      green: {
        500: theme('colors.green.500')
      },
      red: {
        500: theme('colors.red.500')
      },
      yellow: {
        500: theme('colors.yellow.500')
      },
      blue: {
        500: theme('colors.blue.500')
      },
      gray: {
        500: theme('colors.gray.500')
      }
    })
  },
  plugins: [require('@tailwindcss/forms')],
  content: ['src/**/*.{ts,js,vue}', 'nuxt.config.js']
}
