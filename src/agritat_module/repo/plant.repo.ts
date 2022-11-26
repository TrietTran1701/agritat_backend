import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ResponseService } from '../../nmd_core/shared/response.service';
import { IFResponse } from '../../nmd_core/shared/response.interface';
// import { Product, ProductModel } from '../../model/product/product.model';
import { Plant, PlantModel } from '../model/plant/plant.model';
import mongoose from 'mongoose';

@Injectable()
export class PlantRepo {
  constructor(private readonly responseService: ResponseService) {}

  async getAllPlantsByOwnerId(gardenOwnerId: string): Promise<PlantModel[]> {
    const res: PlantModel[] = await Plant.find({
      gardenOwnerId: gardenOwnerId,
    });

    return res;
  }

  async getById(id: ObjectId): Promise<PlantModel> {
    const res: PlantModel = await Plant.findById(id);
    return res;
  }

  async upsert(id: ObjectId, item: any): Promise<PlantModel> {
    const plant = await Plant.findByIdAndUpdate(
      { _id: id },
      { $set: item },
      { new: true, upsert: true },
    );
    return plant;
  }

  async create(item: any): Promise<PlantModel> {
    const plant = new Plant(item);
    await plant.save();
    return plant;
  }

  async getAll({}, filter?: any): Promise<PlantModel[]> {
    const plants: PlantModel[] = await Plant.find(filter);
    return plants;
  }

  async delete(id: ObjectId) {
    await Plant.findByIdAndRemove(id);
    return;
  }
}
