import { Module } from '@nestjs/common';
import { CumRapService } from './cum-rap.service';
import { CumRapController } from './cum-rap.controller';
import { ResponseModule } from 'src/services/response/response.module';
import { RolesModule } from 'src/services/roles/roles.module';
import { HeThongRapModule } from 'src/he-thong-rap/he-thong-rap.module';

@Module({
  imports: [ResponseModule, RolesModule, HeThongRapModule],
  controllers: [CumRapController],
  providers: [CumRapService],
  exports: [CumRapService],
})
export class CumRapModule { }
