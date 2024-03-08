import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePhimDto } from './dto/create-phim.dto';
import { UpdatePhimDto } from './dto/update-phim.dto';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { PrismaClient } from '@prisma/client';
import { ResponseData } from 'src/services/response/response.interface';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';

@Injectable()
export class PhimService {

  constructor(
    private readonly responseHelperService: ResponseHelperService,
    private readonly cloudinaryService: CloudinaryService,
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

  async xoaPhimService(ma_phim: number): Promise<ResponseData> {
    try {
      const checkPhimExist = await this.layThongTinChiTietPhimTheoMaPhimService(ma_phim);
      if (checkPhimExist.status !== HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "phim khong ton tai!");
      }

      const checkDelete = await this.cloudinaryService.deleteImage(checkPhimExist.data?.hinh_anh);

      await this.prisma.phim.delete({
        where: {
          ma_phim
        }
      });

      if (checkDelete?.result != 'ok') {
        return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "can't delete images in cloudinary!");
      }

      return this.responseHelperService.createResponse(HttpStatus.OK, "xoa phim thanh cong!");
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async capNhatThongTinPhimService(phimUpdate: UpdatePhimDto): Promise<ResponseData> {
    try {
      const checkPhimExist = await this.layThongTinChiTietPhimTheoMaPhimService(+phimUpdate.ma_phim);
      if (checkPhimExist.status != HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "phim khong ton tai!");
      }

      const updatePhim = {
        ...phimUpdate,
        ngay_khoi_chieu: new Date(phimUpdate.ngay_khoi_chieu),
        dang_chieu: Boolean(phimUpdate.dang_chieu),
        sap_chieu: Boolean(phimUpdate.sap_chieu),
        hot: Boolean(phimUpdate.hot),
        danh_gia: +phimUpdate.danh_gia,
      }

      await this.prisma.phim.update({
        where: {
          ma_phim: +phimUpdate.ma_phim
        },
        data: updatePhim
      });

      return this.responseHelperService.createResponse(HttpStatus.OK, "update thong tin phim thanh cong!");
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async capNhatHinhAnhPhimService(url: string, phim: ResponseData): Promise<ResponseData> {
    try {

      const checkDelete = await this.cloudinaryService.deleteImage(phim.data?.hinh_anh);
      await this.prisma.phim.update({
        where: {
          ma_phim: +phim.data?.ma_phim
        },
        data: {
          hinh_anh: url
        }
      });

      if (checkDelete?.result != 'ok') {
        return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "can't delete images in cloudinary!");
      }

      return this.responseHelperService.createResponse(HttpStatus.OK, "thay doi hinh anh thanh cong");
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

}
