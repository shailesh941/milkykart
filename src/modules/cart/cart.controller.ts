import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('cart')
//@UseGuards(JwtAuthGuard, RolesGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  //@Roles(Role.Admin, Role.Customer)
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.cartService.findAll();
  }

  @Get('my-cart')
  @Roles(Role.Customer)
  getMyCart(@Request() req) {
    return this.cartService.findByUser(req.user.id);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Customer)
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Customer)
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Customer)
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
