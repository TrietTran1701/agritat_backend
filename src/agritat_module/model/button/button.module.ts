import { Module } from '@nestjs/common';
import { ButtonRepo } from '../../repo';
import { ButtonService } from '../../service/button.service';
import { AuthMiddleware } from '../../../nmd_core/common/middlewares/bearer.middleware';
import { ButtonController } from '../../controller/button.controller';
import { ResponseService } from '../../../nmd_core/shared/response.service';
import { UserRepo } from '../../../auth_modules/repo';

@Module({
  imports: [],
  controllers: [ButtonController],
  providers: [
    ButtonRepo,
    ButtonService,
    AuthMiddleware,
    UserRepo,
    ResponseService,
  ],
  exports: [],
})
export class ButtonModule {}
