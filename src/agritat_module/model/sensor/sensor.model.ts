import mongoose, { ObjectId, Schema } from 'mongoose';
export class SensorModel {
  price: string;
  value: string;
  type: string; // Temp, Humid
  area: string;
  gardenOwnerId: ObjectId;
}

const SensorSchema = new Schema({
  price: { type: String, default: '' },
  value: { type: String, default: '' },
  type: { type: String, default: '' },
  area: { type: String, default: '' },
  gardenOwnerId: { type: String, default: '' },
});

export const Sensor = mongoose.model<SensorModel>('Sensor', SensorSchema);
