import { IsOptional, IsString } from 'class-validator';

export class QueryProjectsDto {
  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  search: string;
}
