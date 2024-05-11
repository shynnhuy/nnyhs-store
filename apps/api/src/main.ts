import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformationInterceptor } from './shared/responseInterceptor';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  const config = app.get(ConfigService);

  app.enableCors({
    origin: true,
    credentials: true,
    preflightContinue: false,
  });

  app.use(cookieParser());

  app.setGlobalPrefix(config.get('app.appPrefix'));
  app.useGlobalInterceptors(new TransformationInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NnyhS Store API')
    .setDescription('NnyhS Store API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.get('app.port'), () => {
    return console.log(`Server is running on port ${config.get('app.port')}`);
  });
}
bootstrap();
