import { Module } from '@nestjs/common';
import { UserModule } from '../auth_modules/model/user/user.module';
import { ButtonModule } from './module/button/button.module';
@Module({
  imports: [UserModule, ButtonModule],
})
export class AgritatModule {}
