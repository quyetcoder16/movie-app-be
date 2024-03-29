import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ResponseModule } from 'src/services/response/response.module';
import { RolesModule } from 'src/services/roles/roles.module';
import { CloudinaryModule } from 'src/services/cloudinary/cloudinary.module';

@Module({
  imports: [ResponseModule, RolesModule, CloudinaryModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
