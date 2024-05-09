import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
  mixin,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { UserRoles } from '../schema/users';
import { compareString } from '../utility/string';
import { AccessTokenGuard } from './access-token.guard';
import { RequestWithUser } from 'src/auth/types/request-with-user';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest<RequestWithUser>();
    return requiredRoles.some((role) => compareString(user?.role, role));
  }
}

export const RoleGuard = (role?: UserRoles): Type<CanActivate> => {
  @Injectable()
  class RoleGuardMixin extends AccessTokenGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      if (!role) {
        return true;
      }

      return user?.role === role;
    }
  }

  return mixin(RoleGuardMixin);
};
