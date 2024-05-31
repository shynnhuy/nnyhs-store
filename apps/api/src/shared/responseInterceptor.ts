import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { PageNumberPaginationMeta } from 'src/lib/pagination/types';

export interface Response<T> {
  message: string;
  success: boolean;
  result?: T;
  meta?: PageNumberPaginationMeta<boolean>;
  error: null;
  timestamps: Date;
  statusCode: number;
  path: string;
}

export class TransformationInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    const path = context.switchToHttp().getRequest().url;

    return next.handle().pipe(
      map((data) => ({
        message: data && 'message' in data ? data.message : 'Successfully',
        success: data && 'success' in data ? data.success : true,
        timestamps: new Date(),
        statusCode,
        path,
        error: null,
        result: data?.result ?? data ?? undefined,
        meta: data?.meta ?? undefined,
      })),
    );
    // return next.handle().pipe(
    //   map((data) => {
    //     let defaultResponse: Response<T> = {
    //       message: data && 'message' in data ? data.message : 'Successfully',
    //       success: data && 'success' in data ? data.success : true,
    //       timestamps: new Date(),
    //       statusCode,
    //       path,
    //       error: null,
    //     };
    //     console.log('data', data);
    //     if (data && 'result' in data) {
    //       if ('items' in data.result && 'meta' in data) {
    //         defaultResponse = {
    //           ...defaultResponse,
    //           result: data.result.items,
    //           meta: data.result.meta,
    //         };
    //       } else {
    //         defaultResponse = {
    //           ...defaultResponse,
    //           result: data.result,
    //         };
    //       }
    //     } else {
    //       defaultResponse = {
    //         ...defaultResponse,
    //         result: data,
    //       };
    //     }

    //     return defaultResponse;
    //   }),
    // );
  }
}
