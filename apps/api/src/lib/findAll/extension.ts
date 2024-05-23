import { Prisma } from '@prisma/client';
import { resetOrdering, resetSelection } from '../pagination/helper';
import { Pagination, PrismaModel, PrismaQuery } from '../pagination/types';

const paginate = async (
  model: PrismaModel,
  query: PrismaQuery,
  { page, limit }: Pagination['pagination'],
) => {
  const previousPage = page > 1 ? page - 1 : null;

  let pageCount = null;

  const [results, totalCount] = await Promise.all([
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
  const nextPage = page < pageCount ? page + 1 : null;

  return {
    items: results,
    meta: {
      isFirstPage: previousPage === null,
      isLastPage: nextPage === null,
      currentPage: page,
      previousPage,
      nextPage,
      pageCount,
      totalCount,
    },
  };
};

export const extension = Prisma.defineExtension({
  name: 'findAll',
  model: {
    $allModels: {
      async findAll<T>(this: T, args: Prisma.Args<T, 'findMany'> & Pagination) {
        const { pagination, ...query } = args;

        if (pagination) {
          return paginate(this as PrismaModel, query as any, pagination);
        } else {
          const context = Prisma.getExtensionContext(this);
          const result = await (context as any).findMany(query);
          return result;
        }
      },
    },
  },
});
