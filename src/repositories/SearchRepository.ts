import { AxiosResponse } from 'axios'
import { BaseRepository } from '~/repositories/BaseRepository'
import { SearchResponse } from '~/types/http/Responses'

export default class SearchRepository extends BaseRepository {
  search(q: string): Promise<AxiosResponse<SearchResponse>> {
    return this.ctx.$axios.get<SearchResponse>(`${this.prefix}/`, {
      params: {
        q
      }
    })
  }
}
