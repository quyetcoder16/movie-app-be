import { Module } from '@nestjs/common';
import { QuanLyVeService } from './quan-ly-ve.service';
import { QuanLyVeController } from './quan-ly-ve.controller';
import { ResponseModule } from 'src/services/response/response.module';
import { RolesModule } from 'src/services/roles/roles.module';
import { LichChieuModule } from 'src/lich-chieu/lich-chieu.module';
import { UserModule } from 'src/user/user.module';
import { GheModule } from 'src/ghe/ghe.module';

@Module({
  imports: [ResponseModule, RolesModule, LichChieuModule, UserModule, GheModule],
  controllers: [QuanLyVeController],
  providers: [QuanLyVeService],
  exports: [QuanLyVeService]
})
export class QuanLyVeModule { }
