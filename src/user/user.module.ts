import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ResponseModule } from 'src/services/response/response.module';
import { RolesModule } from 'src/services/roles/roles.module';

@Module({
  imports: [ResponseModule, RolesModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
