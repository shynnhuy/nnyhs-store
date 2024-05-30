import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsNumber()
  limit: number;
  @IsNumber()
  page: number;
}
