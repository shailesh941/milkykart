import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import type { Request } from 'express';

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
  @UseGuards(JwtAuthGuard)
  getMyCart(@Req() req: Request) {
    //console.log(req.user)
    const data:any = req.user;
    return this.cartService.findByUser(data.id);
  }

  @Get(':id')
  //@Roles(Role.Admin, Role.Customer)
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @Patch('item/:id')
  @UseGuards(JwtAuthGuard)
  updateCartItem(
    @Param('id') id: string,
    @Body() dto: any,
    @Req() req: Request
  ) {
    const user: any = req.user;

    console.log(id, dto, req)
    return this.cartService.updateCartItem(
      id,
      user.id,
      dto
    );
  }
  @Delete('item/:id')
  // @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard)
  deleteCartItem(@Param('id') id: string, @Req() req: Request) {
    const user: any = req.user;
    return this.cartService.deleteCartItem(id, user);
  }

  // @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(id, updateCartDto);
  // }

  @Delete(':id')
  // @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
