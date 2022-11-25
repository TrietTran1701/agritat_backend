import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ReturnNotFoundException } from '../../nmd_core/common/utils/custom.error';
import { ProductRepo } from '../repo';
import { CreateProductReq, UpdateProductReq } from '../request';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepo) {}

  async getById(id: ObjectId) {
    const oldProduct = await this.productRepo.getById(id);
    if (!oldProduct) throw ReturnNotFoundException('Product not found.');
    return oldProduct;
  }

  async scanProductInfo(query: any) {
    const deviceId = query.deviceId;
    if (!deviceId) throw ReturnNotFoundException('Method not allowed');

    const id = query.id;
    const oldProduct = await this.getById(id);
    await this.productRepo.upsert(id, {});
    return oldProduct;
  }

  async createProduct(createProductReq: CreateProductReq) {
    const newProduct = await this.productRepo.create(createProductReq);
    return newProduct;
  }

  async updateOwner(updateProductReq: UpdateProductReq) {
    const oldProduct = await this.getById(updateProductReq.id);
    if (oldProduct.isVerify == true)
      throw ReturnNotFoundException('Method not allowed');

    const updatedData = {
      ownerDeviceId: updateProductReq.ownerDeviceId,
      name: updateProductReq.name,
      lastVerify: Date.now(),
      isVerify: true,
    };

    const newProduct = await this.productRepo.upsert(
      updateProductReq.id,
      updatedData,
    );
    return newProduct;
  }
}
