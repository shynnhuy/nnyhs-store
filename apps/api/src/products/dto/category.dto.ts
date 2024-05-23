import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  image: string;
}

export class QueryCategoryDto {
  limit: number;
  page: number;
}
