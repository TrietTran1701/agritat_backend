import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ResponseService } from '../../nmd_core/shared/response.service';
import { IFResponse } from '../../nmd_core/shared/response.interface';
// import { Product, ProductModel } from '../../model/product/product.model';
import { Sensor, SensorModel } from '../model/sensor/sensor.model';
import mongoose from 'mongoose';

@Injectable()
export class SensorRepo {
  constructor(private readonly responseService: ResponseService) {}

  async getAllSensorsByOwnerId(gardenOwnerId: string): Promise<SensorModel[]> {
    const res: SensorModel[] = await Sensor.find({
      gardenOwnerId: gardenOwnerId,
    });

    return res;
  }

  async getById(id: ObjectId): Promise<SensorModel> {
    const res: SensorModel = await Sensor.findById(id);
    return res;
  }

  async upsert(id: ObjectId, item: any): Promise<SensorModel> {
    const sensor = await Sensor.findByIdAndUpdate(
      { _id: id },
      { $set: item },
      { new: true, upsert: true },
    );
    return sensor;
  }

  async create(item: any): Promise<SensorModel> {
    const sensor = new Sensor(item);
    await sensor.save();
    return sensor;
  }

  async getAll({}, filter?: any): Promise<SensorModel[]> {
    const sensors: SensorModel[] = await Sensor.find(filter);
    return sensors;
  }

  async delete(id: ObjectId) {
    await Sensor.findByIdAndRemove(id);
    return;
  }
}
