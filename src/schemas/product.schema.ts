import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type ProductDocument=Product & Document
@Schema()
export class Product {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
}

export  const ProductSchema=SchemaFactory.createForClass(Product);