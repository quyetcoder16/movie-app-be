import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePhimDto } from './dto/create-phim.dto';
import { UpdatePhimDto } from './dto/update-phim.dto';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { PrismaClient } from '@prisma/client';
import { ResponseData } from 'src/services/response/response.interface';

@Injectable()
export class PhimService {

  constructor(
    private readonly responseHelperService: ResponseHelperService,
  ) { }

  prisma = new PrismaClient();


  async layThongTinChiTietPhimTheoMaPhimService(ma_phim: number): Promise<ResponseData> {
    try {
      const phim = await this.prisma.phim.findFirst({
        where: {
          ma_phim
        }
      })
      if (phim) {
        return this.responseHelperService.createResponse(HttpStatus.OK, "lay thong tin phim chi tiet thanh cong", phim);
      } else {
        return this.responseHelperService.createResponse(HttpStatus.NOT_FOUND, "khong tim thay phim");
      }
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error", error);
    }
  }

  async layDanhSachPhimService(): Promise<ResponseData> {
    try {
      const listMovie = await this.prisma.phim.findMany();
      return this.responseHelperService.createResponse(HttpStatus.OK, "lay danh sach phim thanh cong!", listMovie);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error", error);
    }
  }

  async layDanhSachPhimPhanTrangService(page: number, size: number): Promise<ResponseData> {
    try {
      const listPhim = await this.prisma.phim.findMany({
        skip: ((page - 1) * size),
        take: size
      });
      return this.responseHelperService.createResponse(HttpStatus.OK, "lay danh sach phim phan trang thanh cong!", listPhim);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error", error);
    }
  }

  async layDanhSachTheoNgayService(startDate: Date, endDate: Date, page: number, size: number): Promise<ResponseData> {
    try {
      const listPhim = await this.prisma.phim.findMany({
        where: {
          ngay_khoi_chieu: {
            gte: startDate,
            lte: endDate,
          }
        },
        skip: ((page - 1) * size),
        take: size
      });
      return this.responseHelperService.createResponse(HttpStatus.OK, "lay danh sach phim phan trang thanh cong!", listPhim);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error", error);
    }
  }

  async themPhimService(url_image: string, newPhim: CreatePhimDto): Promise<ResponseData> {
    try {
      const Nphim = {
        ...newPhim,
        hinh_anh: url_image,
        dang_chieu: Boolean(newPhim.dang_chieu),
        sap_chieu: Boolean(newPhim.sap_chieu),
        hot: Boolean(newPhim.hot),
        danh_gia: +newPhim.danh_gia,
        ngay_khoi_chieu: new Date(newPhim.ngay_khoi_chieu)
      }

      await this.prisma.phim.create({
        data: Nphim
      });

      return this.responseHelperService.createResponse(HttpStatus.OK, "them phim thanh cong");

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error", error);
    }
  }

}
