import { Module } from '@nestjs/common';
import { PhimService } from './phim.service';
import { PhimController } from './phim.controller';
import { ResponseModule } from 'src/services/response/response.module';
import { RolesModule } from 'src/services/roles/roles.module';
import { CloudinaryModule } from 'src/services/cloudinary/cloudinary.module';

@Module({
  imports:[ResponseModule, RolesModule, CloudinaryModule],
  controllers: [PhimController],
  providers: [PhimService],
  exports:[PhimService]
})
export class PhimModule {}
