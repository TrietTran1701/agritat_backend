import { Module } from '@nestjs/common';
import { PlantRepo } from '../../repo';
import { PlantService } from '../../service/plant.service';
import { AuthMiddleware } from '../../../nmd_core/common/middlewares/bearer.middleware';
import { PlantController } from '../../controller/plant.controller';
import { ResponseService } from '../../../nmd_core/shared/response.service';
import { UserRepo } from '../../../auth_modules/repo';

@Module({
  imports: [],
  controllers: [PlantController],
  providers: [
    PlantRepo,
    PlantService,
    AuthMiddleware,
    UserRepo,
    ResponseService,
  ],
  exports: [],
})
export class PlantModule {}
