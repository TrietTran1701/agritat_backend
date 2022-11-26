import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ReturnNotFoundException } from '../../nmd_core/common/utils/custom.error';
import { PlantRepo } from '../repo';
import { CreatePlantReq, UpdatePlantReq } from '../request';

@Injectable()
export class PlantService {
  constructor(private readonly plantRepo: PlantRepo) {}

  async getById(id: ObjectId) {
    const oldPlant = await this.plantRepo.getById(id);
    if (!oldPlant) throw ReturnNotFoundException('Plant not found.');
    return oldPlant;
  }

  async getByOwnerId(ownerId: string) {
    const plants = await this.plantRepo.getAllPlantsByOwnerId(ownerId);
    if (!plants) throw ReturnNotFoundException('Plants not found');

    return plants;
  }

  async create(createPlantReq: CreatePlantReq) {
    const newPlant = await this.plantRepo.create(createPlantReq);
    return newPlant;
  }

  async updatePlant(updatePlantReq: UpdatePlantReq) {
    const oldPlant = await this.getById(updatePlantReq.id);

    const newPlant = await this.plantRepo.upsert(
      updatePlantReq.id,
      updatePlantReq,
    );
    return newPlant;
  }
}
