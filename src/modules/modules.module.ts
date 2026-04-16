import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { InventoryModule } from './inventory/inventory.module';
import { ShippingModule } from './shipping/shipping.module';
import { GenAiModule } from './gen-ai/gen-ai.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [AuthModule, UsersModule, ProductsModule, CategoriesModule, CartModule, OrdersModule, PaymentsModule, ReviewsModule, InventoryModule, ShippingModule, GenAiModule, UploadModule]
})
export class ModulesModule {}
