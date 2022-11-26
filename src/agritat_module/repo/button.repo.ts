import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ResponseService } from '../../nmd_core/shared/response.service';
import { IFResponse } from '../../nmd_core/shared/response.interface';
// import { Product, ProductModel } from '../../model/product/product.model';
import { Button, ButtonModel } from '../model/button/button.model';
import mongoose from 'mongoose';

@Injectable()
export class ButtonRepo {
  constructor(private readonly responseService: ResponseService) {}

  async getAllButtonsByOwnerId(gardenOwnerId: string): Promise<ButtonModel[]> {
    const res: ButtonModel[] = await Button.find({
      gardenOwnerId: gardenOwnerId,
    });

    return res;
  }

  async getById(id: ObjectId): Promise<ButtonModel> {
    const res: ButtonModel = await Button.findById(id);
    return res;
  }

  async upsert(id: ObjectId, status: any): Promise<ButtonModel> {
    const button = await Button.findByIdAndUpdate(
      { _id: id },
      { $set: status },
      { new: true, upsert: true },
    );
    return button;
  }

  async create(item: any): Promise<ButtonModel> {
    const button = new Button(item);
    await button.save();
    return button;
  }

  //   async findAllAndPaging(
  //     { page, limit, sort }: { page: number; limit: number; sort?: any },
  //     filter?: any,
  //   ): Promise<IFResponse<ProductModel>> {
  //     let skip = 0;
  //     skip = (page - 1) * limit;
  //     const products: ProductModel[] = await Product.find(filter)
  //       .limit(limit)
  //       .skip(skip)
  //       .sort(sort);
  //     const totalRecords: number = await Product.countDocuments(filter);
  //     return this.responseService.getResponse<ProductModel>(
  //       products,
  //       totalRecords,
  //       +page,
  //       +limit,
  //     );
  //   }

  async getAll({}, filter?: any): Promise<ButtonModel[]> {
    const buttons: ButtonModel[] = await Button.find(filter);
    return buttons;
  }

  async delete(id: ObjectId) {
    await Button.findByIdAndRemove(id);
    return;
  }
}
