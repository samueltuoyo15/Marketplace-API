import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import type { AuthenticatedRequest } from 'src/common/guards/roles.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';

@Controller('products')
export class ProductsController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('seller')
  createProduct(
    @Body() body: { name: string; price: number },
    @Req() req: AuthenticatedRequest,
  ) {
    return this.productRepo.save({
      name: body.name,
      price: body.price,
      sellerId: req.user.user_id,
    });
  }

  @Get()
  getProducts() {
    return this.productRepo.find();
  }
}
