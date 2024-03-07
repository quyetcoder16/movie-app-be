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


}
