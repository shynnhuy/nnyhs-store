import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class OTP extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  otp: string;

  @Prop({ required: true, default: Date.now, index: { expires: '1m' } })
  expiry: Date;
}

export const OTPSchema = SchemaFactory.createForClass(OTP);

export type OTPDocument = OTP & Document;
