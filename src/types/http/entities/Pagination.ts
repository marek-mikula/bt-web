export interface Pagination<D> {
  data: D[]
  meta: {
    currentPage: number
    from: number
    lastPage: number
    path: number
    perPage: number
    to: number
    total: number
  }
}
