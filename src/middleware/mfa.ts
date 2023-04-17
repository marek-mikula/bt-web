import { Context } from '@nuxt/types'

export default function (context: Context) {
  const token = context.route.query.token as string | null

  // redirect to login page
  if (!token) {
    return context.redirect('/')
  }
}
