import { Module } from '@nestjs/common';
import { GheService } from './ghe.service';
import { GheController } from './ghe.controller';
import { RolesModule } from 'src/services/roles/roles.module';
import { ResponseModule } from 'src/services/response/response.module';
import { RapPhimModule } from 'src/rap-phim/rap-phim.module';

@Module({
  imports: [ResponseModule, RolesModule, RapPhimModule],
  controllers: [GheController],
  providers: [GheService],
  exports: [GheService]
})
export class GheModule { }
