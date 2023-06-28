import { Context } from '@nuxt/types'
import UserEntity from '~/types/entities/UserEntity'

export default function (context: Context) {
  const { path } = context.route

  if (!path.startsWith('/app') || path === '/app/quiz') {
    return
  }

  // user is not logged in
  if (!context.$auth.loggedIn) {
    return context.redirect('/')
  }

  const user = context.$auth.user as any as UserEntity

  // redirect to quiz page
  if (!user.quizTaken) {
    return context.redirect('/app/quiz')
  }
}