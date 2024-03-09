import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateHeThongRapDto } from './dto/create-he-thong-rap.dto';
import { UpdateHeThongRapDto } from './dto/update-he-thong-rap.dto';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { PrismaClient } from '@prisma/client';
import { ResponseData } from 'src/services/response/response.interface';

@Injectable()
export class HeThongRapService {
  constructor(
    private readonly responseHelperService: ResponseHelperService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  prisma = new PrismaClient();

  async layDanhSachHeThongRapService(): Promise<ResponseData> {
    try {
      const listHeThongRap = await this.prisma.heThongRap.findMany();

      return this.responseHelperService.createResponse(HttpStatus.OK, "lay danh sach he thong rap thanh cong", listHeThongRap);

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async layThongTinChiTietHeThongRapService(ma_he_thong_rap: Number): Promise<ResponseData> {
    try {
      const heThongRap = await this.prisma.heThongRap.findFirst({
        where: {
          ma_he_thong_rap: +ma_he_thong_rap
        }
      });

      if (!heThongRap) {
        return this.responseHelperService.createResponse(HttpStatus.NOT_FOUND, "he thong rap khong ton tai");
      }

      return this.responseHelperService.createResponse(HttpStatus.OK, "lay thong tin chi tiet he thong rap thanh cong!", heThongRap);

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async themHeThongRapService(url_logo: string, newHTR: CreateHeThongRapDto): Promise<ResponseData> {
    try {
      const newHeThongRap = {
        ...newHTR,
        logo: url_logo
      }
      await this.prisma.heThongRap.create({
        data: newHeThongRap
      });
      return this.responseHelperService.createResponse(HttpStatus.OK, "them he thong rap thanh cong");
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async xoaHeThongRapService(ma_he_thong_rap: number): Promise<ResponseData> {
    try {
      const checkHTR = await this.layThongTinChiTietHeThongRapService(ma_he_thong_rap);
      if (checkHTR.status !== HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "he thong rap khong ton tai!");
      }

      const checkDelete = await this.cloudinaryService.deleteImage(checkHTR.data?.logo);

      await this.prisma.heThongRap.delete({
        where: {
          ma_he_thong_rap
        }
      });

      if (checkDelete?.result != 'ok') {
        return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "can't delete logo in cloudinary!");
      }

      return this.responseHelperService.createResponse(HttpStatus.OK, "xoa he thong rap thanh cong!");
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async capNhatHeThongRapService(url: string, HTR: ResponseData, updateHTR: UpdateHeThongRapDto): Promise<ResponseData> {
    try {

      const checkDelete = await this.cloudinaryService.deleteImage(HTR.data?.logo);
      await this.prisma.heThongRap.update({
        where: {
          ma_he_thong_rap: +HTR.data?.ma_he_thong_rap
        },
        data: {
          ten_he_thong_rap: updateHTR.ten_he_thong_rap,
          logo: url,
        }
      });

      if (checkDelete?.result != 'ok') {
        return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "can't delete images in cloudinary!");
      }

      return this.responseHelperService.createResponse(HttpStatus.OK, "cap nhat he thong rap thanh cong");
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }



}
