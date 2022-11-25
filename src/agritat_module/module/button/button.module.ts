import { Module } from '@nestjs/common';
import { ButtonRepo, UserRepo } from '../../repo';
import { ButtonService } from '../../service/button/button.service';
import { AuthMiddleware } from '../../../nmd_core/common/middlewares/bearer.middleware';
import { ButtonController } from '../../controller/button/button.controller';
import { ResponseService } from '../../../nmd_core/shared/response.service';

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
