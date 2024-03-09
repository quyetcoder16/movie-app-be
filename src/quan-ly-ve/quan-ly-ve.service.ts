import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateQuanLyVeDto } from './dto/create-quan-ly-ve.dto';
import { UpdateQuanLyVeDto } from './dto/update-quan-ly-ve.dto';
import { PrismaClient } from '@prisma/client';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { ResponseData } from 'src/services/response/response.interface';
import { LichChieuService } from 'src/lich-chieu/lich-chieu.service';
import { GheService } from 'src/ghe/ghe.service';
import { CreateVeAdminDto } from './dto/create-ve-admin.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class QuanLyVeService {
  constructor(
    private readonly responseHelperService: ResponseHelperService,
    private readonly lichChieuService: LichChieuService,
    private readonly gheService: GheService,
    private readonly userService: UserService,
  ) { }

  prisma = new PrismaClient();

  async layDanhSachVeByUserIdService(user_id: number): Promise<ResponseData> {
    try {
      const listVe = await this.prisma.datVe.findMany({
        where: {
          user_id: +user_id
        }
      });
      return this.responseHelperService.createResponse(HttpStatus.OK, "lay danh sach ve dat thanh cong", listVe);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async layDanhSachVeDatAdminService(): Promise<ResponseData> {
    try {
      const listVe = await this.prisma.datVe.findMany();
      return this.responseHelperService.createResponse(HttpStatus.OK, "lay danh sach ve dat admin thanh cong", listVe);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async timVeByMaLichChieuAndMaGheService(ma_lich_chieu: number, ma_ghe: number): Promise<ResponseData> {
    try {
      const ve = await this.prisma.datVe.findFirst({
        where: {
          ma_lich_chieu: +ma_lich_chieu,
          ma_ghe: +ma_ghe
        }
      });
      if (!ve) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "khong tim thay ve");
      }
      return this.responseHelperService.createResponse(HttpStatus.OK, "tim ve thanh cong!", ve);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async layThongTinChiTietVeService(ma_ve: number): Promise<ResponseData> {
    try {
      const ve = await this.prisma.datVe.findFirst({
        where: {
          ma_ve: +ma_ve
        }
      });
      if (!ve) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "khong tim thay ve");
      }
      return this.responseHelperService.createResponse(HttpStatus.OK, "tim ve thanh cong!", ve);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async datVeService(datVe: CreateQuanLyVeDto, user: any): Promise<ResponseData> {
    try {
      const checkGhe = await this.gheService.layThongTinChiTietGheService(+datVe.ma_ghe);
      if (checkGhe.status !== HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "ghe khong ton tai!");
      }
      const checkLich = await this.lichChieuService.layThongTinChiTietLichChieu(+datVe.ma_lich_chieu);
      if (checkLich.status !== HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "lich chieu khong ton tai!");
      }

      const checkExist = await this.timVeByMaLichChieuAndMaGheService(+datVe.ma_lich_chieu, +datVe.ma_ghe);
      if (checkExist.status == HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "ghe da duoc dat!");
      }


      const newDatVe = {
        ...datVe,
        user_id: user?.user_id
      }

      await this.prisma.datVe.create({
        data: newDatVe
      });

      return this.responseHelperService.createResponse(HttpStatus.CREATED, "dat ve thanh cong!");

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async huyVeService(ma_ve: number, user: any): Promise<ResponseData> {
    try {
      const checkVe = await this.layThongTinChiTietVeService(+ma_ve);
      if (checkVe.status !== HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "ve chua duoc dat!");
      }
      if (checkVe.data?.user_id != user?.user_id) {
        return this.responseHelperService.createResponse(HttpStatus.FORBIDDEN, "ban khong co quyen huy ve nay!");
      }
      await this.prisma.datVe.delete({
        where: {
          ma_ve: +ma_ve
        }
      });
      return this.responseHelperService.createResponse(HttpStatus.OK, "huy ve thanh cong!");
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async datVeAdminService(datVe: CreateVeAdminDto): Promise<ResponseData> {
    try {
      const checkGhe = await this.gheService.layThongTinChiTietGheService(+datVe.ma_ghe);
      if (checkGhe.status !== HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "ghe khong ton tai!");
      }
      const checkLich = await this.lichChieuService.layThongTinChiTietLichChieu(+datVe.ma_lich_chieu);
      if (checkLich.status !== HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "lich chieu khong ton tai!");
      }

      const checkExist = await this.timVeByMaLichChieuAndMaGheService(+datVe.ma_lich_chieu, +datVe.ma_ghe);
      if (checkExist.status == HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "ghe da duoc dat!");
      }

      const checkUser = await this.userService.getUserByUserIdService(+datVe.user_id);

      if (checkUser.status != HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "nguoi dung khong ton tai!");
      }

      const newDatVe = {
        ...datVe
      }

      await this.prisma.datVe.create({
        data: newDatVe
      });

      return this.responseHelperService.createResponse(HttpStatus.CREATED, "dat ve thanh cong!");

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }


  async huyVeAdminService(ma_ve: number): Promise<ResponseData> {
    try {
      const checkVe = await this.layThongTinChiTietVeService(+ma_ve);
      if (checkVe.status !== HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "ve chua duoc dat!");
      }
      await this.prisma.datVe.delete({
        where: {
          ma_ve: +ma_ve
        }
      });
      return this.responseHelperService.createResponse(HttpStatus.OK, "huy ve thanh cong!");
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }


}
