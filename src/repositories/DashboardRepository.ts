import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import { DashboardIndexResponse } from '~/types/http/Responses'

export default class DashboardRepository extends BaseRepository {
  index(): Promise<AxiosResponse<DashboardIndexResponse>> {
    return this.ctx.$axios.get<DashboardIndexResponse>(`${this.prefix}/`)
  }
}
