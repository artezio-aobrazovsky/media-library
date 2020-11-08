export interface ColumnConfig<T> {
  field: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
}

export type SortingInfo = {
  direction: SortDirection;
  field: string;
};

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}
