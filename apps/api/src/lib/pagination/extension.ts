import { Prisma } from '@prisma/client';
import { resetOrdering, resetSelection } from './helper';
import {
  PageNumberPaginationMeta,
  PageNumberPaginationOptions,
  Paginated,
  PrismaModel,
  PrismaQuery,
} from './type';

type Paginator<O extends PaginatorOptions> = O['pages'] extends {
  limit: number;
}
  ? <
      T,
      A,
      TOptions extends Omit<P, 'limit'>,
      P extends PageNumberPaginationOptions,
    >(
      this: T,
      options?: TOptions & { limit?: P['limit'] },
      args?: Prisma.Exact<
        A,
        Omit<Prisma.Args<T, 'findMany'>, 'cursor' | 'take' | 'skip'>
      >,
    ) => Promise<{
      items: Prisma.Result<T, A, 'findMany'>;
      meta: PageNumberPaginationMeta<
        // if includePageCount provided
        TOptions extends { includePageCount: boolean }
          ? TOptions['includePageCount']
          : // else if global includePageCount provided
            O['pages'] extends { includePageCount: boolean }
            ? O['pages']['includePageCount']
            : // else
              false
      >;
    }>
  : <
      T,
      A,
      TOptions extends PageNumberPaginationOptions,
      P extends PageNumberPaginationOptions,
    >(
      this: T,
      options: TOptions & { limit: P['limit'] },
      args?: Prisma.Exact<
        A,
        Omit<Prisma.Args<T, 'findMany'>, 'cursor' | 'take' | 'skip'>
      >,
    ) => Promise<{
      items: Prisma.Result<T, A, 'findMany'>;
      meta: PageNumberPaginationMeta<
        // if includePageCount provided
        TOptions extends { includePageCount: boolean }
          ? TOptions['includePageCount']
          : // else if global includePageCount provided
            O['pages'] extends { includePageCount: boolean }
            ? O['pages']['includePageCount']
            : false
      >;
    }>;

type PaginatorOptions = {
  pages?: {
    limit?: number;
    includePageCount?: boolean;
  };
};
export const paginateWithPages = async (
  model: PrismaModel,
  query: PrismaQuery,
  { page, limit, includePageCount }: Required<PageNumberPaginationOptions>,
): Promise<Paginated<typeof includePageCount>> => {
  const previousPage = page > 1 ? page - 1 : null;

  let results;
  let nextPage;
  let pageCount = null;
  let totalCount = null;
  if (includePageCount) {
    [results, totalCount] = await Promise.all([
      model.findMany({
        ...query,
        ...{
          skip: (page - 1) * (limit ?? 0),
          take: limit === null ? undefined : limit,
        },
      }),
      model.count({
        ...query,
        ...resetSelection,
        ...resetOrdering,
      }),
    ]);

    pageCount = limit === null ? 1 : Math.ceil(totalCount / limit);
    nextPage = page < pageCount ? page + 1 : null;
  } else {
    results = await model.findMany({
      ...query,
      ...{
        skip: (page - 1) * (limit ?? 0),
        take: limit === null ? undefined : limit + 1,
      },
    });

    nextPage = limit === null ? null : results.length > limit ? page + 1 : null;
    if (nextPage) {
      results.pop();
    }
  }

  return {
    items: results,
    meta: {
      ...{
        isFirstPage: previousPage === null,
        isLastPage: nextPage === null,
        currentPage: page,
        previousPage,
        nextPage,
      },
      ...(includePageCount === true
        ? {
            pageCount,
            totalCount,
          }
        : {}),
    },
  };
};

export const createPaginator = <O extends PaginatorOptions>(
  globalOptions?: O,
): Paginator<O> =>
  function paginate(this, options = {}, args) {
    const {
      page = 1,
      limit,
      includePageCount = false,
    } = {
      ...globalOptions?.pages,
      ...(options as PageNumberPaginationOptions),
    } satisfies Omit<PageNumberPaginationOptions, 'limit'>;

    if (
      typeof page !== 'number' ||
      page < 1 ||
      page > Number.MAX_SAFE_INTEGER
    ) {
      throw new Error('Invalid page value');
    }

    if (limit !== null && typeof limit !== 'number') {
      throw new Error('Missing limit value');
    }
    if (limit !== null && (limit < 1 || limit > Number.MAX_SAFE_INTEGER)) {
      throw new Error('Invalid limit value');
    }

    const query = (args ?? {}) as PrismaQuery;

    return paginateWithPages(this as PrismaModel, query, {
      limit,
      page,
      includePageCount,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
  };

export const extension = <O extends PaginatorOptions>(options?: O) => {
  const paginate = createPaginator(options);

  return Prisma.defineExtension({
    name: 'paginate',
    model: {
      $allModels: {
        paginate,
      },
    },
  });
};
