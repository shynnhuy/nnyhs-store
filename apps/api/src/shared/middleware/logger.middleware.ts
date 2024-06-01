import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as util from 'util';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  async use(request: Request, response: Response, next: NextFunction) {
    const { method, body, originalUrl } = request;

    const ip = request['X-Forwarded-For'] || request['ip'];

    this.logger.log(
      util.format(
        '%s %s \n# User: %j \n# IP: %s\n# Payload: %j',
        method,
        originalUrl,
        request['user'] ? request['user']['id'] : 0,
        ip,
        body,
      ),
    );

    next();
  }
}
