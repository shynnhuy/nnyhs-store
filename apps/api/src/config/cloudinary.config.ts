import { registerAs } from '@nestjs/config';

export const cloudinaryConfig = registerAs('cloudinary', () => ({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  folderPath: process.env.CLOUDINARY_FOLDER,
  publicId_prefix: process.env.CLOUDINARY_PUBLIC_ID,
  bigSize: process.env.CLOUDINARY_BIGSIZE,
}));
