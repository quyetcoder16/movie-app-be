import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCumRapDto } from './dto/create-cum-rap.dto';
import { UpdateCumRapDto } from './dto/update-cum-rap.dto';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { ResponseData } from 'src/services/response/response.interface';
import { PrismaClient } from '@prisma/client';
import { HeThongRapService } from 'src/he-thong-rap/he-thong-rap.service';

@Injectable()
export class CumRapService {
  constructor(
    private readonly responseHelperService: ResponseHelperService,
    private readonly heThongRapService: HeThongRapService,
  ) { }

  prisma = new PrismaClient();


  async layDanhSachCumRapService(): Promise<ResponseData> {
    try {
      const listCumRap = await this.prisma.cumRap.findMany();

      return this.responseHelperService.createResponse(HttpStatus.OK, "lay danh sach cum rap thanh cong", listCumRap);

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async layThongTinChiTietCumRapService(ma_cum_rap: Number): Promise<ResponseData> {
    try {
      const cumRap = await this.prisma.cumRap.findFirst({
        where: {
          ma_cum_rap: +ma_cum_rap
        }
      });

      if (!cumRap) {
        return this.responseHelperService.createResponse(HttpStatus.NOT_FOUND, "cum rap khong ton tai");
      }

      return this.responseHelperService.createResponse(HttpStatus.OK, "lay thong tin chi tiet cum rap thanh cong!", cumRap);

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async layThongTinCumRapTheoHeThongRapServices(ma_he_thong_rap: number): Promise<ResponseData> {
    try {
      const listCumRap = await this.prisma.cumRap.findMany({
        where: {
          ma_he_thong_rap: +ma_he_thong_rap
        }
      });
      return this.responseHelperService.createResponse(HttpStatus.OK, "lay thong tin cum rap theo ma he thong rap thanh cong!", listCumRap);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async themCumRapService(newCumRap: CreateCumRapDto): Promise<ResponseData> {
    try {
      const checkHTR = await this.heThongRapService.layThongTinChiTietHeThongRapService(+newCumRap.ma_he_thong_rap);
      if (checkHTR.status !== HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "ma he thong rap khong ton tai!");
      }

      await this.prisma.cumRap.create({
        data: newCumRap
      });

      return this.responseHelperService.createResponse(HttpStatus.OK, "them cum rap thanh cong!");
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async capNhatCumRapService(updateCumRap: UpdateCumRapDto): Promise<ResponseData> {
    try {
      const checkCumRapExist = await this.layThongTinChiTietCumRapService(+updateCumRap.ma_cum_rap);
      if (checkCumRapExist.status !== HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "cum rap khong ton tai!");
      }

      const checkHeThongRapExist = await this.heThongRapService.layThongTinChiTietHeThongRapService(+updateCumRap.ma_he_thong_rap);

      if (checkHeThongRapExist.status !== HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "he thong rap khong ton tai!");
      }

      await this.prisma.cumRap.update({
        where: {
          ma_cum_rap: +updateCumRap.ma_cum_rap
        },
        data: updateCumRap
      });

      return this.responseHelperService.createResponse(HttpStatus.OK, "cap nhat cum rap thanh cong!");

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async xoaCumRapService(ma_cum_rap: number): Promise<ResponseData> {
    try {
      const checkCumRap = await this.layThongTinChiTietCumRapService(+ma_cum_rap);
      if (checkCumRap.status != HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "cum rap khong ton tai!");
      }
      await this.prisma.cumRap.delete({
        where: {
          ma_cum_rap: +ma_cum_rap
        }
      });
      return this.responseHelperService.createResponse(HttpStatus.OK, "xoa cum rap thanh cong!");
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

}
