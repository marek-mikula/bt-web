import { Context } from '@nuxt/types'

const axiosPlugin: any = (ctx: Context) => {
  // eslint-disable-next-line
  ctx.$axios.onRequest((config) => {
    // todo
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
