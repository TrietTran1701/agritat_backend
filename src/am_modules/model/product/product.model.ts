import { IsNotEmpty, IsString } from 'class-validator';
import mongoose, { ObjectId, Schema } from 'mongoose';
export class ProductModel {
  name: string;
  ownerDeviceId: string; // save in local storage of chorme
  numScan: number;
  numDeviceId: number;
  lastVerify: number;
  isVerify: boolean;
}

const ProductSchema = new Schema({
  name: { type: String, default: '' },
  ownerDeviceId: { type: String, default: '' },
  numScan: { type: Number, default: 0 },
  numDeviceId: { type: Number, default: 0 },
  lastVerify: { type: Number, default: Date.now() },
  isVerify: { type: Boolean, default: false },
});

export const Product = mongoose.model<ProductModel>('Product', ProductSchema);
