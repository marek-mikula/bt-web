const isLocalhost = process.env.APP_ENV === 'local'

export default {
  // change source root directory
  srcDir: 'src/',

  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in' // default
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in' // default
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'BT-WEB',
    htmlAttrs: {
      lang: 'en',
      class: 'h-full bg-gray-50'
    },
    bodyAttrs: {
      class: 'h-full'
    },
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Simple application interface for newcomers to the crypto-world to buy cryptocurrency with ease!'
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon/favicon-16x16.png'
      },
      {
        rel: 'manifest',
        href: '/favicon/manifest.json'
      }
    ]
  },

  // server-side rendering + client-side navigation
  mode: 'universal',

  // enable server-side rendering
  ssr: true,

  // All options for tailwindcss - https://tailwindcss.nuxtjs.org/options
  tailwindcss: {
    cssPath: '~~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/app.css'],

  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },

  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/repositories.ts',
    '~/plugins/configs.ts',
    '~/plugins/lodash.ts',
    '~/plugins/cookies.ts',
    { src: '~/plugins/toast.ts', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',

    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',

    // https://github.com/nuxt-modules/eslint
    '@nuxtjs/eslint-module',

    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://axios.nuxtjs.org/
    '@nuxtjs/axios',

    // https://www.npmjs.com/package/@nuxtjs/dotenv
    '@nuxtjs/dotenv',

    // https://www.npmjs.com/package/@nuxtjs/proxy
    '@nuxtjs/proxy',

    // https://image.nuxtjs.org/
    '@nuxt/image',

    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',

    // https://i18n.nuxtjs.org/setup
    '@nuxtjs/i18n'
  ],

  // Image optimizer config
  image: {
    provider: 'static'
  },

  // i18n config
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json'
      }
    ],
    lazy: true,
    langDir: '~/assets/locales',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      alwaysRedirect: false,
      fallbackLocale: 'en',
      redirectOn: 'root',
      useCookie: true,
      cookieCrossOrigin: false,
      cookieKey: 'language',
      cookieDomain: process.env.APP_DOMAIN,
      cookieSecure: !isLocalhost
    },
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'en',
      silentFallbackWarn: !isLocalhost,
      silentTranslationWarn: !isLocalhost
    }
  },

  // Axios config
  axios: {
    debug: isLocalhost, // additional log of requests
    https: !isLocalhost,
    progress: true, // show progress bar
    retry: false, // retrying of requests
    proxy: true, // use proxy
    baseURL: '/',
    headers: {
      common: {
        'Application-Name': 'BT-WEB/1.0',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      delete: {},
      get: {},
      head: {},
      post: {},
      put: {},
      patch: {}
    },
    withCredentials: true
  },

  router: {
    middleware: [
      'auth', // middleware for authentication
      'quiz' // middleware to check if user passed the entry quiz
    ]
  },

  // Auth module config
  auth: {
    defaultStrategy: 'laravelSanctum',
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/app'
    },
    watchLoggedIn: false, // redirect during login/logout
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: '/api',
        endpoints: {
          csrf: {
            url: '/auth/csrf-cookie',
            method: 'get'
          },
          login: {
            url: '/auth/login',
            method: 'post'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          },
          user: {
            url: '/auth/me',
            method: 'get'
          }
        },
        user: {
          autoFetch: false, // do not fetch user automatically after login
          property: 'data.user'
        },
        cookie: {
          name: 'XSRF-TOKEN'
        }
      }
    },
    cookie: {
      secure: !isLocalhost
    }
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: '/'
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_RESOURCE
    }
  },

  proxy: {
    '/api': {
      target: process.env.API_RESOURCE + process.env.API_PREFIX,
      pathRewrite: {
        '^/api': ''
      },
      changeOrigin: true,
      secure: !isLocalhost
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Disable telemetry data collection
  telemetry: false
}
