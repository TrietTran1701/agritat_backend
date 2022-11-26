import { ObjectId } from 'mongoose';

export class CreatePlantReq {
  name: string;
  isInfected: boolean;
  gardenOwnerId: string;
}

export class UpdatePlantReq {
  id: ObjectId;
  name: string;
  isInfected: boolean;
  gardenOwnerId: string;
}
