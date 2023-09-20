import { Translation } from '~/types/common/Common'

export interface ColumnConfig {
  // unique identified of the column
  key: string

  // attribute name on the item object
  attribute: string

  // column head label
  label: Translation

  // class used for <th>
  headColClass?: string

  // class used for <td>
  bodyColClass?: string
}

export interface TableConfig {
  unique: string
  emptyLabel: Translation
  columns: ColumnConfig[]
}
