import { Context } from '@nuxt/types'

const axiosPlugin: any = (ctx: Context): void => {
  // eslint-disable-next-line
  ctx.$axios.onRequest((config) => {
    const { $cookies, $repositories } = ctx

    // fetch csrf token if needed
    if (
      ['POST', 'PUT', 'DELETE', 'PATCH'].includes(
        (config.method || '').toUpperCase()
      ) &&
      !$cookies.get('XSRF-TOKEN') &&
      !config.doNotCheckCsrf
    ) {
      return $repositories.auth.csrf().then(() => config)
    }

    return config
  })

  // eslint-disable-next-line
  ctx.$axios.onResponse((response) => {
    // todo
  })

  // eslint-disable-next-line
  ctx.$axios.onError((err) => {
    // todo
  })

  // eslint-disable-next-line
  ctx.$axios.onRequestError((err) => {
    // todo
  })

  // eslint-disable-next-line
  ctx.$axios.onResponseError((err) => {
    // todo
  })
}

export default axiosPlugin
