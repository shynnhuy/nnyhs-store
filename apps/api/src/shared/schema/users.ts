import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';

export enum UserRoles {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Schema({ timestamps: true })
export class Users extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRoles, default: UserRoles.CUSTOMER })
  role: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: null })
  otp: string;

  @Prop({ default: null })
  otpExpiryTime: Date;

  @Prop({ default: null })
  refreshToken: string;

  isValidPassword: (password: string) => boolean;
  hashPassword: () => Promise<void>;
}

export const UserSchema = SchemaFactory.createForClass(Users);
// UserSchema.pre('save', async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

UserSchema.methods = {
  hashPassword: async function () {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      throw error;
    }
  },
  isValidPassword: function (password: string) {
    try {
      return bcrypt.compareSync(password, this.password);
    } catch (error) {
      throw error;
    }
  },
};

export type UserDocument = Users & Document;
