import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateGheDto } from './dto/create-ghe.dto';
import { UpdateGheDto } from './dto/update-ghe.dto';
import { PrismaClient } from '@prisma/client';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { ResponseData } from 'src/services/response/response.interface';
import { RapPhimService } from 'src/rap-phim/rap-phim.service';
import { LOAI_GHE } from './loaiGhe.constant';

@Injectable()
export class GheService {
  constructor(
    private readonly responseHelperService: ResponseHelperService,
    private readonly rapPhimService: RapPhimService,
  ) { }

  prisma = new PrismaClient();

  async layDanhSachGheService(): Promise<ResponseData> {
    try {
      const listGhe = await this.prisma.ghe.findMany();

      return this.responseHelperService.createResponse(HttpStatus.OK, "lay danh ghe thanh cong", listGhe);

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async layThongTinChiTietGheService(ma_ghe: number): Promise<ResponseData> {
    try {
      const ghe = await this.prisma.ghe.findFirst({
        where: {
          ma_ghe: +ma_ghe,
        }
      });
      if (!ghe) {
        return this.responseHelperService.createResponse(HttpStatus.NOT_FOUND, "khong tim thay ghe!");
      }
      return this.responseHelperService.createResponse(HttpStatus.OK, "lay thong tin chi tiet ghe thanh cong!", ghe);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async layDanhSachGheTheoRapService(ma_rap: number): Promise<ResponseData> {
    try {
      const checkRap = await this.rapPhimService.layThongTinChiTietRapPhimService(+ma_rap);
      if (checkRap.status !== HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "rap phim khong ton tai!");
      }

      const listGhe = await this.prisma.ghe.findMany({
        where: {
          ma_rap: +ma_rap
        }
      });
      return this.responseHelperService.createResponse(HttpStatus.OK, "lay danh sach ghe theo rap phim thanh cong!", listGhe);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async themGheService(newGhe: CreateGheDto): Promise<ResponseData> {
    try {

      if (newGhe.loai_ghe != LOAI_GHE.Normal && newGhe.loai_ghe != LOAI_GHE.Vip) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "loai ghe khong dung!");
      }

      const checkRap = await this.rapPhimService.layThongTinChiTietRapPhimService(+newGhe.ma_rap);
      if (checkRap.status !== HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "rap phim khong ton tai!");
      }

      await this.prisma.ghe.create({
        data: newGhe
      });

      return this.responseHelperService.createResponse(HttpStatus.CREATED, "Them ghe thanh cong!");


    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async xoaGheServices(ma_ghe: number): Promise<ResponseData> {
    try {
      const checkGhe = await this.layThongTinChiTietGheService(+ma_ghe);
      if (checkGhe.status !== HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "ghe khong ton tai!");
      }
      await this.prisma.ghe.delete({
        where: {
          ma_ghe: +ma_ghe,
        }
      });

      return this.responseHelperService.createResponse(HttpStatus.OK, "xoa ghe thanh cong!");

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

}
