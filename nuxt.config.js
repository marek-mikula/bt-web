const isLocalhost = process.env.APP_ENV === 'local'

export default {
  // change source root directory
  srcDir: 'src/',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'bt-web',
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
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
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
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/repositories.ts',
    '~/plugins/lodash.ts'
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
    '@nuxtjs/auth-next'
  ],

  // Image optimizer config
  image: {
    provider: 'static'
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
    }
  },

  router: {
    middleware: ['auth']
  },

  // Auth module config
  auth: {
    defaultStrategy: 'laravelJWT',
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/app'
    },
    watchLoggedIn: false,
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: '/api',
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post'
          },
          refresh: {
            url: '/auth/refresh',
            method: 'get'
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
        token: {
          type: 'Bearer',
          global: true,
          name: 'Authorization',
          property: 'data.token.accessToken',
          maxAge: process.env.JWT_ACCESS_TOKEN_LIFETIME * 60
        },
        refreshToken: {
          property: 'data.token.refreshToken',
          maxAge: process.env.JWT_REFRESH_TOKEN_LIFETIME * 60
        },
        user: {
          property: 'data.user'
        },
        autoLogout: false
      }
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
