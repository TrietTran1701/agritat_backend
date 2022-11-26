import mongoose, { ObjectId, Schema } from 'mongoose';
export class PlantModel {
  name: string;
  isInfected: boolean;
  gardenOwnerId: ObjectId;
}

const PlantSchema = new Schema({
  name: { type: String, default: '' },
  isInfected: { type: Boolean, default: false },
  gardenOwnerId: { type: String, default: '' },
});

export const Plant = mongoose.model<PlantModel>('Plant', PlantSchema);
