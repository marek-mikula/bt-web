import { Context } from '@nuxt/types'
import QuizConfig from '~/configs/QuizConfig'

export default (ctx: Context) => ({
  quiz: new QuizConfig(ctx)
})
