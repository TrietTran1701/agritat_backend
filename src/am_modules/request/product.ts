import { ObjectId } from 'mongoose';

export class CreateProductReq {
  data: any;
}

export class UpdateProductReq {
  id: ObjectId;
  ownerDeviceId: string;
  isVerify: boolean;
  name: string;
}
