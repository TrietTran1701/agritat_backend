import { ObjectId } from 'mongoose';

export class CreateSensorReq {
  price: string;
  value: string;
  type: string;
  gardenOwnerId: string;
  area: string;
}

export class UpdateSensorReq {
  id: ObjectId;
  price: string;
  value: string;
  type: string;
  gardenOwnerId: string;
  area: string;
}
