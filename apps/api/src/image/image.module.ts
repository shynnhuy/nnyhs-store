import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  imports: [CloudinaryModule],
})
export class ImageModule {}
