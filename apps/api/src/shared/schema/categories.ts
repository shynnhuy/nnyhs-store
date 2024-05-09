import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

export type CategoryDocument = Category & Document;
