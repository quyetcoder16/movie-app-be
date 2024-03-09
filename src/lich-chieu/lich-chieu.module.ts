import { Module } from '@nestjs/common';
import { LichChieuService } from './lich-chieu.service';
import { LichChieuController } from './lich-chieu.controller';
import { ResponseModule } from 'src/services/response/response.module';
import { RolesModule } from 'src/services/roles/roles.module';
import { RapPhimModule } from 'src/rap-phim/rap-phim.module';
import { PhimModule } from 'src/phim/phim.module';

@Module({
  imports: [ResponseModule, RolesModule, RapPhimModule, PhimModule],
  controllers: [LichChieuController],
  providers: [LichChieuService],
  exports: [LichChieuService]
})
export class LichChieuModule { }
