import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRoles } from 'src/shared/schema/users';

export class RegisterDto {
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
  @IsIn(Object.values(UserRoles))
  role?: UserRoles;

  @IsString()
  @IsOptional()
  secretToken?: string;

  isVerified?: boolean;
}
