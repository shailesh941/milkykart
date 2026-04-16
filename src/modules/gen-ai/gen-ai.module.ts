import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GenAiService } from './gen-ai.service';
import { GenAiController } from './gen-ai.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [HttpModule, ProductsModule],
  controllers: [GenAiController],
  providers: [GenAiService],
})
export class GenAiModule {}
