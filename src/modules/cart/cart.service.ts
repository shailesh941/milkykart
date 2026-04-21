import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const user = await this.userRepository.findOne({ where: { id: createCartDto.userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let cart = await this.cartRepository.findOne({
      where: { user: { id: createCartDto.userId } },
      relations: ['items', 'items.product'],
    });

    if (!cart) {
      // Create new cart if user doesn't have one
      cart = this.cartRepository.create({ user });
      await this.cartRepository.save(cart);
    }

    // Add or update items
    for (const item of createCartDto.items) {
      const product = await this.productRepository.findOne({ where: { id: item.productId } });
      if (!product) {
        throw new NotFoundException(`Product ${item.productId} not found`);
      }

      // Check if product already in cart
      const existingItem = cart.items.find(cartItem => cartItem.product.id === item.productId);
      if (existingItem) {
        // Update quantity
        existingItem.quantity += item.quantity;
        await this.cartItemRepository.save(existingItem);
      } else {
        // Add new item
        const cartItem = this.cartItemRepository.create({ cart, product, quantity: item.quantity });
        await this.cartItemRepository.save(cartItem);
      }
    }

    return (await this.cartRepository.findOne({
      where: { id: cart.id },
      relations: ['user', 'items', 'items.product'],
    })) as Cart;
  }

  async findAll(): Promise<Cart[]> {
    return this.cartRepository.find({
      relations: ['user', 'items', 'items.product'],
    });
  }

  async findOne(id: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.product'],
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart!;
  }

  async findByUser(userId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
    if (!cart) {
      throw new NotFoundException('Cart not found for user');
    }
    return cart!;
  }

  async update(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cart = await this.findOne(id);

    // Add or update items if provided
    if (updateCartDto.items) {
      for (const item of updateCartDto.items) {
        const product = await this.productRepository.findOne({ where: { id: item.productId } });
        if (!product) {
          throw new NotFoundException(`Product ${item.productId} not found`);
        }

        // Check if product already in cart
        const existingItem = cart.items.find(cartItem => cartItem.product.id === item.productId);
        if (existingItem) {
          // Update quantity
          existingItem.quantity += item.quantity;
          await this.cartItemRepository.save(existingItem);
        } else {
          // Add new item
          const cartItem = this.cartItemRepository.create({ cart, product, quantity: item.quantity });
          await this.cartItemRepository.save(cartItem);
        }
      }
    }

    return this.findOne(id);
  }
  async updateCartItem(
    itemId: any,
    userId: any,
    dto: any
  ) {
    const item = await this.cartItemRepository.findOne({
      where: { id: itemId },
      relations: ['cart'],
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    // // 🔐 Check ownership
    // if (item.cart.userId !== userId) {
    //   throw new ForbiddenException('Not allowed');
    // }

    // update quantity
    item.quantity = dto.quantity ?? item.quantity;

    return this.cartItemRepository.save(item);
  }

  async deleteCartItem(itemId: string, userId: string) {

    const item = await this.cartItemRepository.findOne({
      where: { id: itemId },
      relations: ['cart'], // 🔥 needed to access cart.userId
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    // // 🔐 ownership check
    // if (item.cart.userId !== userId) {
    //   throw new ForbiddenException('You are not allowed to delete this item');
    // }

    await this.cartItemRepository.remove(item);

    return {
      message: 'Cart item deleted successfully',
      id: itemId,
    };
  }

  async remove(id: string): Promise<void> {
    const cart = await this.findOne(id);
    await this.cartRepository.remove(cart);
  }
}
