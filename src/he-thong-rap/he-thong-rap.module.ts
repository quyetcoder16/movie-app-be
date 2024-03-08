import { Module } from '@nestjs/common';
import { HeThongRapService } from './he-thong-rap.service';
import { HeThongRapController } from './he-thong-rap.controller';
import { ResponseModule } from 'src/services/response/response.module';
import { RolesModule } from 'src/services/roles/roles.module';
import { CloudinaryModule } from 'src/services/cloudinary/cloudinary.module';

@Module({
  imports: [ResponseModule, RolesModule, CloudinaryModule],
  controllers: [HeThongRapController],
  providers: [HeThongRapService],
  exports: [HeThongRapService]
})
export class HeThongRapModule { }
