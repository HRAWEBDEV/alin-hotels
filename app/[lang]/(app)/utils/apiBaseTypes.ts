type Pagination = {
 limit: number;
 offset: number;
};
type PagedData<T> = {
 rows: T[];
 rowsCount: number;
} & Pagination;

export type { PagedData, Pagination };
