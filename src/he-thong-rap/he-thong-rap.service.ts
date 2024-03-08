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

  async layDanhSachHeThongRap(): Promise<ResponseData> {
    try {
      const listHeThongRap = await this.prisma.heThongRap.findMany();

      return this.responseHelperService.createResponse(HttpStatus.OK, "lay danh sach he thong rap thanh cong", listHeThongRap);

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async layThongTinChiTietHeThongRap(ma_he_thong_rap: Number): Promise<ResponseData> {
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

}
