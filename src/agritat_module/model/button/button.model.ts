import mongoose, { ObjectId, Schema } from 'mongoose';
export class ButtonModel {
  status: string;
  gardenOwnerId: string;
}

const ButtonSchema = new Schema({
  gardenOwnerId: { type: String, default: '' },
  status: { type: String, default: 'off' },
});

export const Button = mongoose.model<ButtonModel>('Button', ButtonSchema);
