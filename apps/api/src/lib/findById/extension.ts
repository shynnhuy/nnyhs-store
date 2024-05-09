import { Prisma } from '@prisma/client';

export const extension = Prisma.defineExtension({
  name: 'findById',
  model: {
    $allModels: {
      async findById<T>(
        this: T,
        id: string,
        args?: Omit<Prisma.Args<T, 'findFirst'>, 'where'>,
      ) {
        const context = Prisma.getExtensionContext(this);

        const result = await (context as any).findFirst({
          where: { id },
          ...args,
        });
        return result;
      },
    },
  },
});
