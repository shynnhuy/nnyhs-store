import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const extension = Prisma.defineExtension({
  name: 'modelLogger',
  query: {
    $allModels: {
      async $allOperations({ operation, model, args, query }) {
        const start = performance.now();
        const result = await query(args);
        const end = performance.now();
        const time = (end - start) / 1000;
        new Logger('Prisma').debug(
          `${model}.${operation} took ${time.toFixed(3)}s`,
        );
        return result;
      },
    },
  },
});
