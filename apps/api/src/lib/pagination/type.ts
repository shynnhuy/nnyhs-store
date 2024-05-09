export type PaginationData = {
  page?: number;
  limit?: number;
};

/**
 * Proxy functions
 *
 * used to create custom methods for prisma models
 */
export type ProxyFunctions = {
  findMany: (params: unknown, pagination: PaginationData) => Promise<any>;
  count: (params: unknown) => Promise<number>;
};

export type PrismaModel = {
  [k in 'findMany' | 'count']: CallableFunction;
};

export type PrismaQuery = {
  where: Record<string, unknown>;
};

export type PageNumberPaginationOptions = {
  limit: number | null;
  page?: number;
  includePageCount?: boolean;
};

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

export type GetCursorFunction<R> = (result: R) => string;

export type ParseCursorFunction<C> = (cursor: string) => C;

export type CursorPaginationOptions<Result, Condition> = {
  limit: number | null;
  after?: string;
  before?: string;
  getCursor?: GetCursorFunction<Result>;
  parseCursor?: ParseCursorFunction<Condition>;
};

export type CursorPaginationMeta = {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
};

export type Paginated<T extends boolean> = {
  items: unknown;
  meta: PageNumberPaginationMeta<T>;
};

export type Pagination = {
  pagination?: { limit: number; page: number };
};