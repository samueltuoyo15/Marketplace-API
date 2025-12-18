import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import type { AuthenticatedRequest } from 'src/common/guards/roles.guard';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../orders/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('buyer')
  placeOrder(
    @Body() body: { productId: string; quantity: number },
    @Req() req: AuthenticatedRequest,
  ) {
    return this.orderRepo.save({
      productId: body.productId,
      quantity: body.quantity,
      buyerId: req.user.user_id,
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMyOrders(@Req() req: AuthenticatedRequest) {
    return this.orderRepo.find({
      where: { buyerId: req.user.user_id },
    });
  }
}
