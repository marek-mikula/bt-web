import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import QuizQuestionsResponse from '~/types/http/responses/Quiz/QuizQuestionsResponse'

export default class QuizRepository extends BaseRepository {
  questions(): Promise<AxiosResponse<QuizQuestionsResponse>> {
    return this.context.$axios.get<QuizQuestionsResponse>(
      `${this.prefix}/questions`
    )
  }
}
