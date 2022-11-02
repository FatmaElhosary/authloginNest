import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDocument, Product } from '../schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(
    userId: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    console.log(createProductDto);
    const newProduct = await this.productModel.create(
    createProductDto,
    );
   

    return newProduct.save();
  }

  async findAll() {
    const products=await this.productModel.find().exec();
    return products;
  }

 /*  findOne(id: number) {
    return `This action returns a #${id} product`;
  } */

  async update(id: string, createProductDto: CreateProductDto) {
    const updateProduct = await this.productModel.findByIdAndUpdate(
      id,
      createProductDto,
      { new: true },
    );
    return updateProduct;
  }

  async remove(id: string): Promise<Product> {
    const deleteProduct = await this.productModel.findOneAndRemove({
     id
    });
    return deleteProduct;
  }
}
