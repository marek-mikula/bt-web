import { Plugin } from '@nuxt/types'

const axios: Plugin = ({ $axios }) => {
  // eslint-disable-next-line
  $axios.onRequest((config) => {
    // todo
  })

  // eslint-disable-next-line
  $axios.onResponse((response) => {
    // todo
  })

  // eslint-disable-next-line
  $axios.onError((err) => {
    // todo
  })

  // eslint-disable-next-line
  $axios.onRequestError((err) => {
    // todo
  })

  // eslint-disable-next-line
  $axios.onResponseError((err) => {
    // todo
  })
}

export default axios
