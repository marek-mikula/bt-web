import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import QuizQuestionsResponse from '~/types/http/responses/Quiz/QuizQuestionsResponse'
import FinishForm from '~/types/forms/Quiz/FinishForm'
import SuccessResponse from '~/types/http/responses/SuccessResponse'

export default class QuizRepository extends BaseRepository {
  questions(): Promise<AxiosResponse<QuizQuestionsResponse>> {
    return this.context.$axios.get<QuizQuestionsResponse>(
      `${this.prefix}/questions`
    )
  }

  finish(form: FinishForm): Promise<AxiosResponse<SuccessResponse>> {
    return this.context.$axios.post<SuccessResponse>(
      `${this.prefix}/finish`,
      form
    )
  }
}
