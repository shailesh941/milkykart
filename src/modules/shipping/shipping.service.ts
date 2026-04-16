import { Injectable } from '@nestjs/common';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';

@Injectable()
export class ShippingService {
  create(createShippingDto: CreateShippingDto) {
    return 'This action adds a new shipping';
  }

  findAll() {
    return `This action returns all shipping`;
  }

  findOne(id: string) {
    return `This action returns a #${id} shipping`;
  }

  update(id: string, updateShippingDto: UpdateShippingDto) {
    return `This action updates a #${id} shipping`;
  }

  remove(id: string) {
    return `This action removes a #${id} shipping`;
  }
}
