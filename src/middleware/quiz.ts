import { Context } from '@nuxt/types'
import { User } from '~/types/http/entities/User'

export default function (context: Context) {
  const { path } = context.route

  if (!path.startsWith('/app') || path === '/app/quiz') {
    return
  }

  // user is not logged in
  if (!context.$auth.loggedIn) {
    return context.redirect('/')
  }

  const user = context.$auth.user as any as User

  // redirect to quiz page
  if (!user.quizTaken) {
    return context.redirect('/app/quiz')
  }
}
