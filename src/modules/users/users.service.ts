import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // ➕ CREATE
  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      ...dto,
      password: hashedPassword,
      role: dto.role ?? 'customer',
    });

    const saved = await this.userRepo.save(user);
    return await this.findOne(saved.id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  // 📄 GET ALL
  async findAll(): Promise<User[]> {
    return this.userRepo.find({
      relations: ['orders'],
    });
  }

  // 🔍 GET ONE
  async findOne(id: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // ✏️ UPDATE
  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    Object.assign(user, dto);

    const saved = await this.userRepo.save(user);
    return await this.findOne(saved.id);
  }

  // ❌ DELETE (Soft Delete Recommended)
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);

    await this.userRepo.remove(user);
  }
}
