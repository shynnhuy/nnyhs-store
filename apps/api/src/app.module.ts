import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import {
  databaseConfig,
  jwtConfig,
  appConfig,
  cloudinaryConfig,
  googleConfig,
} from './config';
import { ImageModule } from './image/image.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { HttpExceptionFilter } from './shared/httpExceptionFilter';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [
        appConfig,
        jwtConfig,
        databaseConfig,
        cloudinaryConfig,
        googleConfig,
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('db.database_url'),
      }),
    }),
    UsersModule,
    AuthModule,
    CloudinaryModule,
    ProductsModule,
    OrdersModule,
    PrismaModule,
    ImageModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
