import { Module } from '@nestjs/common';
import { ProductModule } from './model/product/product.module';

@Module({
  imports: [ProductModule],
  providers: [],
  exports: [],
})
export class AMModule {}
