import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontSize: {
        xxs: '0.5rem'
      },

      keyframes: {
        zigzag: {
          '0%, 100%': {
            transform: 'translateX(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateX(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        }
      },

      animation: {
        zigzag: 'zigzag 1s infinite'
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
      },
      indigo: {
        500: theme('colors.indigo.500')
      }
    })
  },
  plugins: [require('@tailwindcss/forms')],
  content: ['src/**/*.{ts,js,vue}', 'nuxt.config.js']
}
