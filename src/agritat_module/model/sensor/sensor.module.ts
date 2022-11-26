import { Module } from '@nestjs/common';
import { SensorRepo } from '../../repo';
import { SensorService } from '../../service/sensor.service';
import { AuthMiddleware } from '../../../nmd_core/common/middlewares/bearer.middleware';
import { SensorController } from '../../controller/sensor.controller';
import { ResponseService } from '../../../nmd_core/shared/response.service';
import { UserRepo } from '../../../auth_modules/repo';

@Module({
  imports: [],
  controllers: [SensorController],
  providers: [
    SensorRepo,
    SensorService,
    AuthMiddleware,
    UserRepo,
    ResponseService,
  ],
  exports: [],
})
export class SensorModule {}
