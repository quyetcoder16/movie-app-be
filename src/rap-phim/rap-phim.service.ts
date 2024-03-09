import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRapPhimDto } from './dto/create-rap-phim.dto';
import { UpdateRapPhimDto } from './dto/update-rap-phim.dto';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { PrismaClient } from '@prisma/client';
import { ResponseData } from 'src/services/response/response.interface';
import { CumRapService } from 'src/cum-rap/cum-rap.service';

@Injectable()
export class RapPhimService {
  constructor(
    private readonly responseHelperService: ResponseHelperService,
    private readonly cumRapService: CumRapService,
  ) { }

  prisma = new PrismaClient();

  async layDanhSachRapPhimService(): Promise<ResponseData> {
    try {
      const listRapPhim = await this.prisma.rapPhim.findMany();

      return this.responseHelperService.createResponse(HttpStatus.OK, "lay danh sach rap phim thanh cong", listRapPhim);

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async layThongTinChiTietRapPhimService(ma_rap: number): Promise<ResponseData> {
    try {
      const rapPhim = await this.prisma.rapPhim.findFirst({
        where: {
          ma_rap: +ma_rap
        }
      });

      if (!rapPhim) {
        return this.responseHelperService.createResponse(HttpStatus.NOT_FOUND, "rap phim khong ton tai");
      }

      return this.responseHelperService.createResponse(HttpStatus.OK, "lay thong tin chi tiet rap phim thanh cong!", rapPhim);

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async layThongTinRapPhimTheoCumRapService(ma_cum_rap: number): Promise<ResponseData> {
    try {

      const checkCumRap = await this.cumRapService.layThongTinChiTietCumRapService(+ma_cum_rap);
      if (checkCumRap.status != HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "cum rap khong ton tai!");
      }

      const rapPhim = await this.prisma.rapPhim.findMany({
        where: {
          ma_cum_rap: +ma_cum_rap
        }
      });

      if (!rapPhim) {
        return this.responseHelperService.createResponse(HttpStatus.NOT_FOUND, "rap phim khong ton tai");
      }

      return this.responseHelperService.createResponse(HttpStatus.OK, "lay thong tin rap phim theo ma cum rap thanh cong!", rapPhim);

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async themRapPhimService(newRap: CreateRapPhimDto): Promise<ResponseData> {
    try {
      const checkCumRap = await this.cumRapService.layThongTinChiTietCumRapService(+newRap.ma_cum_rap);
      if (checkCumRap.status != HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "cum rap khong ton tai!");
      }

      await this.prisma.rapPhim.create({
        data: newRap
      });

      return this.responseHelperService.createResponse(HttpStatus.CREATED, "them rap phim thanh cong!");

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async capNhatRapPhimService(updateRap: UpdateRapPhimDto): Promise<ResponseData> {
    try {
      const checkRap = await this.layThongTinChiTietRapPhimService(+updateRap.ma_rap);
      if (checkRap.status != HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "rap phim khong ton tai!");
      }
      const checkCumRap = await this.cumRapService.layThongTinChiTietCumRapService(+updateRap.ma_cum_rap);
      if (checkCumRap.status != HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "cum rap khong ton tai!");
      }

      await this.prisma.rapPhim.update({
        where: {
          ma_rap: +updateRap.ma_rap
        },
        data: updateRap
      });

      return this.responseHelperService.createResponse(HttpStatus.OK, "cap nhat rap phim thanh cong!");

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async xoaRapPhimService(ma_rap: number): Promise<ResponseData> {
    try {
      const checkRap = await this.layThongTinChiTietRapPhimService(+ma_rap);
      if (checkRap.status != HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "rap phim khong ton tai!");
      }

      await this.prisma.rapPhim.delete({
        where: {
          ma_rap: +ma_rap,
        }
      });

      return this.responseHelperService.createResponse(HttpStatus.OK, "xoa rap phim thanh cong!");

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

}
