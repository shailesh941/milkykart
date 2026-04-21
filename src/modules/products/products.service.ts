import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  // ➕ CREATE
  async create(dto: CreateProductDto): Promise<Product> {
    const setData:any = dto;
    const product:any = this.productRepo.create(setData);

    if (setData.category) {
      const category = await this.categoryRepo.findOneBy({ id: setData.category });
      if (!category) throw new NotFoundException('Category not found');
      product.category = category;
    }

    const saved: any = await this.productRepo.save(product);
    return await this.findOne(saved.id);
  }

  // 📄 GET ALL
  async findAll(): Promise<Product[]> {
    return this.productRepo.find({
      relations: ['category'],
    });
  }

  // 🔍 GET ONE
  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  // ✏️ UPDATE
  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product:any = await this.findOne(id);

    if (dto.category !== undefined) {
      if (dto.category === null) {
        product.category = null;
      } else {
        const category = await this.categoryRepo.findOneBy({ id: dto.category });
        if (!category) throw new NotFoundException('Category not found');
        product.category = category;
      }
    }

    const { category, ...dtoWithoutCategory } = dto;
    Object.assign(product, dtoWithoutCategory);

    const saved = await this.productRepo.save(product);
    return await this.findOne(saved.id);
  }

  // ❌ DELETE (Soft Delete Recommended)
  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);

    await this.productRepo.remove(product);
  }
}
