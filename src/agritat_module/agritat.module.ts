import { Module } from '@nestjs/common';
import { ButtonModule } from './model/button/button.module';
import { PlantModule } from './model/plant/plant.module';
import { SensorModule } from './model/sensor/sensor.module';
@Module({
  imports: [ButtonModule, SensorModule, PlantModule],
})
export class AgritatModule {}
