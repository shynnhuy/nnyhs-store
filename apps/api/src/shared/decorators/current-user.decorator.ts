import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from '../schema/users';

export const CurrentUser = createParamDecorator(
  (data: keyof UserDocument, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest().user as UserDocument;
    if (user) {
      return data ? user[data] : user;
    } else {
      return null;
    }
  },
);
