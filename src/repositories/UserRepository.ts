import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import { SuccessResponse } from '~/types/http/Responses'
import { DeleteAccountForm } from '~/types/forms/Settings'

export default class UserRepository extends BaseRepository {
  delete(form: DeleteAccountForm): Promise<AxiosResponse<SuccessResponse>> {
    return this.ctx.$axios.delete<SuccessResponse>(`${this.prefix}/`, {
      data: form
    })
  }
}
