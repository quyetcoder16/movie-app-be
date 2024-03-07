import { Module } from '@nestjs/common';
import { QuanLyBannerService } from './quan-ly-banner.service';
import { QuanLyBannerController } from './quan-ly-banner.controller';
import { ResponseModule } from 'src/services/response/response.module';
import { RolesModule } from 'src/services/roles/roles.module';
import { CloudinaryModule } from 'src/services/cloudinary/cloudinary.module';
import { PhimModule } from 'src/phim/phim.module';

@Module({
  imports: [ResponseModule, RolesModule, CloudinaryModule, PhimModule],
  controllers: [QuanLyBannerController],
  providers: [QuanLyBannerService],
  exports: [QuanLyBannerService],
})
export class QuanLyBannerModule { }
