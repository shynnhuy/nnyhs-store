import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Category } from './categories';

@Schema({ timestamps: true })
export class Products extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  code: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  price: number;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);

export type ProductDocument = Products & Document;
