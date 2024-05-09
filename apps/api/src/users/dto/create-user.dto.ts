import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRoles } from 'src/shared/schema/users';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  @IsIn([UserRoles.ADMIN, UserRoles.CUSTOMER])
  role?: string;

  @IsString()
  @IsOptional()
  secretToken?: string;

  isVerified?: boolean;
}
