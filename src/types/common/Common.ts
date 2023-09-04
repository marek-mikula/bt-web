export type StringMap<V> = { [key: string]: V }
export type NumberMap<V> = { [key: number]: V }

export type Translation =
  | string
  | {
      key: string
      values?: StringMap<any>
    }
