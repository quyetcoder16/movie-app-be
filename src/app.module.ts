import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ResponseHelperService } from './services/response/response-helper.service';
import { QuanLyBannerModule } from './quan-ly-banner/quan-ly-banner.module';
import { PhimModule } from './phim/phim.module';
import { HeThongRapModule } from './he-thong-rap/he-thong-rap.module';
import { CumRapModule } from './cum-rap/cum-rap.module';
import { RapPhimModule } from './rap-phim/rap-phim.module';
import { GheModule } from './ghe/ghe.module';
import { LichChieuModule } from './lich-chieu/lich-chieu.module';
import { QuanLyVeModule } from './quan-ly-ve/quan-ly-ve.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    QuanLyBannerModule,
    PhimModule,
    HeThongRapModule,
    CumRapModule,
    RapPhimModule,
    GheModule,
    LichChieuModule,
    QuanLyVeModule,
  ],
  controllers: [AppController],
  providers: [AppService, ResponseHelperService],
  exports: [ResponseHelperService]
})
export class AppModule { }
