export interface Paginated<T> {
  data: T[];
  totalRows: number;
  totalPages: number;
  pages: number;
  perPage: number;
}
