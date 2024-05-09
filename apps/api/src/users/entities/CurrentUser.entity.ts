import { UserRoles } from '@prisma/client';
import { ObjectId } from 'mongoose';

export type User = {
  _id: ObjectId;
  name: string;
  email: string;
  role: UserRoles;
  isVerified: boolean;
  otp: string;
  otpExpiryTime: Date;
  refreshToken: string;
};
