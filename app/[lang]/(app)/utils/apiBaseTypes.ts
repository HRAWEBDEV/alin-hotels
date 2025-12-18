type Paginatation = {
 limit: number;
 offset: number;
};
type PagedData<T> = {
 rows: T[];
 rowsCount: number;
} & Paginatation;

export type { PagedData, Paginatation };
