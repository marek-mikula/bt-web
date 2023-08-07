import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import { FinishForm } from '~/types/forms/Quiz'
import { QuizQuestionsResponse, SuccessResponse } from '~/types/http/Responses'

export default class QuizRepository extends BaseRepository {
  questions(): Promise<AxiosResponse<QuizQuestionsResponse>> {
    return this.ctx.$axios.get<QuizQuestionsResponse>(
      `${this.prefix}/questions`
    )
  }

  finish(form: FinishForm): Promise<AxiosResponse<SuccessResponse>> {
    return this.ctx.$axios.post<SuccessResponse>(`${this.prefix}/finish`, form)
  }
}
