import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ReturnNotFoundException } from '../../nmd_core/common/utils/custom.error';
import { SensorRepo } from '../repo';
import { CreateSensorReq, UpdateSensorReq } from '../request';

@Injectable()
export class SensorService {
  constructor(private readonly sensorRepo: SensorRepo) {}

  async getById(id: ObjectId) {
    const oldSensor = await this.sensorRepo.getById(id);
    if (!oldSensor) throw ReturnNotFoundException('Sensor not found.');
    return oldSensor;
  }

  async getByOwnerId(ownerId: string) {
    const sensors = await this.sensorRepo.getAllSensorsByOwnerId(ownerId);
    if (!sensors) throw ReturnNotFoundException('Sensors not found');

    return sensors;
  }

  async create(createSensorReq: CreateSensorReq) {
    const newSensor = await this.sensorRepo.create(createSensorReq);
    return newSensor;
  }

  async updateSensor(updateSensorReq: UpdateSensorReq) {
    const oldSensor = await this.getById(updateSensorReq.id);

    const newSensor = await this.sensorRepo.upsert(
      updateSensorReq.id,
      updateSensorReq,
    );
    return newSensor;
  }
}
