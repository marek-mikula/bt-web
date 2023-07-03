import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import JsonResponse from '~/types/http/responses/JsonResponse'
import { Quiz } from '~/types/http/entities/Quiz'

type Data = {
  questions: Quiz[]
}

export default interface QuizQuestionsResponse extends JsonResponse<Data> {
  code: RESPONSE_CODE.OK
}
