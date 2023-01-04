import { ObjectId } from 'mongoose';

export class CreateButtonReq {
  // data: any;
  status: string;
}

export class UpdateButtonStatusReq {
  id: ObjectId;
  status: string;
  gardenOwnerId: ObjectId;
}
