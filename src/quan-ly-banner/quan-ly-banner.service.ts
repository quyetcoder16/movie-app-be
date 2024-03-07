import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { PrismaClient } from '@prisma/client';
import { ResponseData } from 'src/services/response/response.interface';

@Injectable()
export class QuanLyBannerService {

  constructor(
    private readonly responseHelperService: ResponseHelperService,
  ) { }
  prisma = new PrismaClient();

  async layDanhSachBannerService(): Promise<ResponseData> {
    try {
      const listBanner = await this.prisma.banner.findMany();

      return this.responseHelperService.createResponse(HttpStatus.OK, "lay danh sach banner thanh cong", listBanner);

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async getDetailBannerByMaBanner(ma_banner: number): Promise<ResponseData> {
    try {
      const banner = await this.prisma.banner.findFirst({
        where: {
          ma_banner
        }
      });
      if (banner) {
        return this.responseHelperService.createResponse(HttpStatus.OK, "lay thong tin banner chi tiet thanh cong", banner);
      } else {
        return this.responseHelperService.createResponse(HttpStatus.NOT_FOUND, "khong tim thay banner");
      }
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error", error);
    }
  }

  async xoaBannerByMaBannerService(ma_banner: number): Promise<ResponseData> {
    try {
      const checkBannerExist = await this.getDetailBannerByMaBanner(ma_banner);
      if (checkBannerExist.status !== HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "banner khong ton tai!");
      }
      await this.prisma.banner.delete({
        where: {
          ma_banner
        }
      });
      return this.responseHelperService.createResponse(HttpStatus.OK, "xoa banner thanh cong!");
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async taoBannerService(urlUpload: string, ma_phim: number): Promise<ResponseData> {
    try {
      await this.prisma.banner.create({
        data: {
          ma_phim: +ma_phim,
          hinh_anh: urlUpload
        }
      });
      return this.responseHelperService.createResponse(HttpStatus.OK, "tao banner thanh cong!");
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error", error);
    }
  }

}
