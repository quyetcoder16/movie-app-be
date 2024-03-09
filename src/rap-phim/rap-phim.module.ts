import { Module } from '@nestjs/common';
import { RapPhimService } from './rap-phim.service';
import { RapPhimController } from './rap-phim.controller';
import { ResponseModule } from 'src/services/response/response.module';
import { RolesModule } from 'src/services/roles/roles.module';
import { CumRapModule } from 'src/cum-rap/cum-rap.module';

@Module({
  imports: [ResponseModule, RolesModule, CumRapModule],
  controllers: [RapPhimController],
  providers: [RapPhimService],
  exports: [RapPhimService]
})
export class RapPhimModule { }
