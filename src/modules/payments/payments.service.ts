import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  async create(dto: CreatePaymentDto): Promise<Payment> {
    const order = await this.orderRepo.findOneBy({ id: dto.orderId });
    if (!order) throw new NotFoundException('Order not found');

    const payment = this.paymentRepo.create({
      order,
      paymentMethod: dto.paymentMethod,
      status: dto.status,
      amount: dto.amount,
    });

    return this.paymentRepo.save(payment);
  }

  findAll(): Promise<Payment[]> {
    return this.paymentRepo.find({ relations: ['order'] });
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentRepo.findOne({
      where: { id },
      relations: ['order'],
    });

    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async update(id: string, dto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);

    if ((dto as any).orderId) {
      const order = await this.orderRepo.findOneBy({ id: (dto as any).orderId });
      if (!order) throw new NotFoundException('Order not found');
      payment.order = order;
    }

    const { orderId, ...dtoFields } = dto as any;
    Object.assign(payment, dtoFields);

    return this.paymentRepo.save(payment);
  }

  async remove(id: string): Promise<void> {
    const payment = await this.findOne(id);
    await this.paymentRepo.remove(payment);
  }
}
