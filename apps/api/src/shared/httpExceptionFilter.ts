import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';

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

  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

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

    response.status(httpStatus).json(responseBody);
  }
}
