import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto, QueryCategoryDto } from './dto';
import { Public, Roles } from 'src/shared/decorators';
import { UserRoles } from 'src/shared/schema/users';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { QueryProjectsDto } from './dto/query-project.dto';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';

@UseGuards(AccessTokenGuard, RolesGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get('category')
  getAllCategories(@Param() query: QueryCategoryDto) {
    return this.productsService.getAllCategories(query);
  }

  @Roles(UserRoles.ADMIN)
  @Post('category')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.productsService.createCategory(createCategoryDto);
  }

  @Roles(UserRoles.ADMIN)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Public()
  @Get()
  findAll(@Query() query: QueryProjectsDto) {
    return this.productsService.findAll(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Roles(UserRoles.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
