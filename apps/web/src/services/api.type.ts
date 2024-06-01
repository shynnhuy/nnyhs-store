export type PageNumberPagination = {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
};

export type PageNumberCounters = {
  pageCount: number;
  totalCount: number;
};

export type PageNumberPaginationMeta<
  TWithCounters extends boolean | undefined = false,
> = TWithCounters extends true
  ? PageNumberPagination & PageNumberCounters
  : PageNumberPagination;

export type TResponse<T> = {
  message: string;
  success: boolean;
  result: T;
  error: null;
  timestamps: Date;
  statusCode: number;
  meta?: PageNumberPaginationMeta<true>;
};

export type TError = {
  success: boolean;
  statusCode: number;
  timestamp: Date;
  path: string;
  message: string;
  errorResponse: {
    message: string;
    error: string;
    statusCode: number;
  };
};
