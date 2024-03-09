import { PhimService } from './../phim/phim.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateLichChieuDto } from './dto/create-lich-chieu.dto';
import { UpdateLichChieuDto } from './dto/update-lich-chieu.dto';
import { PrismaClient } from '@prisma/client';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { RapPhimService } from 'src/rap-phim/rap-phim.service';
import { ResponseData } from 'src/services/response/response.interface';
import * as moment from 'moment-timezone';

@Injectable()
export class LichChieuService {
  constructor(
    private readonly responseHelperService: ResponseHelperService,
    private readonly rapPhimService: RapPhimService,
    private readonly phimService: PhimService
  ) { }

  prisma = new PrismaClient();

  async layThongTinLichChieuTheoMaPhim(ma_phim: number): Promise<ResponseData> {
    try {
      const checkPhim = await this.phimService.layThongTinChiTietPhimTheoMaPhimService(+ma_phim);
      if (checkPhim.status != HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "phim khong ton tai!");
      }
      const listLichChieu = await this.prisma.lichChieu.findMany({
        where: {
          ma_phim: +ma_phim
        }
      });
      return this.responseHelperService.createResponse(HttpStatus.OK, "lay danh sach lich chieu theo ma phim thanh cong!", listLichChieu);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async layThongTinChiTietLichChieu(ma_lich_chieu: number): Promise<ResponseData> {
    try {
      const lichChieu = await this.prisma.lichChieu.findFirst({
        where: {
          ma_lich_chieu: +ma_lich_chieu
        }
      });
      if (!lichChieu) {
        return this.responseHelperService.createResponse(HttpStatus.NOT_FOUND, "khong tim thay lich chieu!");
      }
      return this.responseHelperService.createResponse(HttpStatus.OK, "lay thong tin chi tiet lich chieu thanh cong!", lichChieu);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async taoLichChieuService(newLich: CreateLichChieuDto): Promise<ResponseData> {
    try {
      const checkPhim = await this.phimService.layThongTinChiTietPhimTheoMaPhimService(+newLich.ma_phim);
      if (checkPhim.status != HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "phim khong ton tai!");
      }

      const checkRap = await this.rapPhimService.layThongTinChiTietRapPhimService(+newLich.ma_rap);
      if (checkRap.status != HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "rap phim khong ton tai!");
      }

      const momentNgayGioChieu = moment.tz(newLich.ngay_gio_chieu, "Asia/Ho_Chi_Minh");

      const newLichChieu = {
        ...newLich,
        ngay_gio_chieu: momentNgayGioChieu.toDate(),
      };

      await this.prisma.lichChieu.create({
        data: newLichChieu
      });

      return this.responseHelperService.createResponse(HttpStatus.CREATED, "tao lich chieu thanh cong!");


    } catch (error) {
      console.log(error);
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async chinhSuaLichChieuService(updateLich: UpdateLichChieuDto): Promise<ResponseData> {
    try {
      const checkLich = await this.layThongTinChiTietLichChieu(+updateLich.ma_lich_chieu);
      if (checkLich.status != HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "lich chieu khong ton tai!");
      }

      const checkPhim = await this.phimService.layThongTinChiTietPhimTheoMaPhimService(+updateLich.ma_phim);
      if (checkPhim.status != HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "phim khong ton tai!");
      }

      const checkRap = await this.rapPhimService.layThongTinChiTietRapPhimService(+updateLich.ma_rap);
      if (checkRap.status != HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "rap phim khong ton tai!");
      }

      const momentNgayGioChieu = moment.tz(updateLich.ngay_gio_chieu, "Asia/Ho_Chi_Minh");


      const newLichChieu = {
        ...updateLich,
        ngay_gio_chieu: momentNgayGioChieu.toDate(),
      };

      await this.prisma.lichChieu.update({
        where: {
          ma_lich_chieu: +updateLich.ma_lich_chieu
        },
        data: newLichChieu
      });

      return this.responseHelperService.createResponse(HttpStatus.OK, "chinh sua lich chieu thanh cong!");

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async xoaLichChieuSerVice(ma_lich_chieu: number): Promise<ResponseData> {
    try {
      const checkLich = await this.layThongTinChiTietLichChieu(+ma_lich_chieu);
      if (checkLich.status != HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "lich chieu khong ton tai!");
      }

      await this.prisma.lichChieu.delete({
        where: {
          ma_lich_chieu: +ma_lich_chieu
        }
      });

      return this.responseHelperService.createResponse(HttpStatus.OK, "Xoa lich chieu thanh cong!");

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

}
