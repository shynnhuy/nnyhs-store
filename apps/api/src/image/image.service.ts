import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ImageService {
  constructor(private readonly cloudinary: CloudinaryService) {}

  async uploadSingle(file: Express.Multer.File) {
    const response = await this.cloudinary.uploadFile(file);
    return {
      message: 'Image uploaded successfully',
      result: response.secure_url,
    };
  }
}
