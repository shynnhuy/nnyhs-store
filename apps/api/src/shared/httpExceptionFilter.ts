import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

export interface HttpExceptionResponse {
  statusCode: number;
  message: string;
  error: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private httpAdapterHost: HttpAdapterHost;

  constructor(httpAdapterHost: HttpAdapterHost) {
    this.httpAdapterHost = httpAdapterHost;
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log('[Debug][Exception] ==> ', exception);

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : String(exception);

    const responseBody = {
      success: false,
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message:
        (exceptionResponse as HttpExceptionResponse).error ||
        (exceptionResponse as HttpExceptionResponse).message ||
        exceptionResponse ||
        'Something went wrong',
      errorResponse: exceptionResponse as HttpExceptionResponse,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
