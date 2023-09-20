import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import { WhaleAlertIndexResponse } from '~/types/http/Responses'

export default class WhaleAlertRepository extends BaseRepository {
  index(page: number): Promise<AxiosResponse<WhaleAlertIndexResponse>> {
    return this.ctx.$axios.get<WhaleAlertIndexResponse>(`${this.prefix}/`, {
      params: {
        page
      }
    })
  }
}
