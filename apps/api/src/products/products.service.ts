import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, QueryCategoryDto } from './dto';
import { QueryProjectsDto } from './dto/query-project.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategories({ limit, page }: QueryCategoryDto) {
    console.log('page, limit', page, limit);
    const res = await this.prisma.category.paginate({
      limit: Number(limit),
      page: Number(page),
    });
    return { success: true, result: res.items, meta: res.meta };
  }

  async createCategory(data: CreateCategoryDto) {
    try {
      const existsCategory = await this.prisma.category.findUnique({
        where: { name: data.name },
      });

      if (existsCategory) {
        throw new Error(`Category [${data.name}] already exists`);
      }

      return this.prisma.category.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async create(data: CreateProductDto) {
    try {
      const result = await this.prisma.product.create({
        data: {
          ...data,
          category: {
            connect: {
              id: data.category,
            },
          },
        },
      });
      return {
        success: true,
        message: 'Product created successfully',
        result,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: QueryProjectsDto) {
    let where: Prisma.ProductWhereInput = {};
    const orderBy: Prisma.ProductOrderByWithRelationInput = {
      createdAt: 'desc',
    };
    if (query.category) {
      where = {
        category: {
          id: query.category,
        },
      };
    }
    if (query.search) {
      where = {
        ...where,
        AND: [
          {
            OR: [
              {
                name: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
            ],
          },
        ],
      };
    }
    // const projects = await this.prisma.product.paginate(
    //   {},
    //   {
    //     include: {
    //       category: true,
    //     },
    //     where,
    //     orderBy,
    //   },
    // );
    const projects = await this.prisma.product.findAll({
      include: {
        category: true,
      },
      where,
      orderBy,

      pagination: {
        limit: 10,
        page: 1,
      },
    });
    return {
      success: true,
      result: projects,
      message: 'Products fetched successfully',
    };
  }

  async findOne(id: string) {
    try {
      const result = await this.prisma.product.findById(id, {
        include: { category: true },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  update(id: string, _: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    try {
      await this.prisma.product.delete({ where: { id } });
      return {
        success: true,
        message: 'Product deleted successfully',
        result: { id },
      };
    } catch (error) {
      throw error;
    }
  }
}
