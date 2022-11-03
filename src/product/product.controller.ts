import { Controller, Get, Post, Body, Patch, Param, Delete ,Request,UseGuards,NotFoundException} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtGaurd } from '../auth/guard/jwt.guard';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtGaurd)
  @Post('/add')
  create(@Request() req,@Body() createProductDto:CreateProductDto) {
    const userId=req.user._id;
    return this.productService.create(userId,createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  } 

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    const product= this.productService.update(id, updateProductDto);
    if(!product) throw new NotFoundException('product does not exist');
    return product;
  }

  @Delete('/:id')
 async remove(@Param('id') id: string) {
   const product=await this.productService.remove(id);
   if(!product) throw new NotFoundException('product does not exist');
   return product;
  }
}
