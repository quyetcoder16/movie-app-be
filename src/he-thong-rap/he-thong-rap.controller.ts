import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Response, Request } from '@nestjs/common';
import { HeThongRapService } from './he-thong-rap.service';
import { CreateHeThongRapDto } from './dto/create-he-thong-rap.dto';
import { UpdateHeThongRapDto } from './dto/update-he-thong-rap.dto';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { RolesHelperService } from 'src/services/roles/roles-helper.service';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseData } from 'src/services/response/response.interface';

@ApiTags("he-thong-rap")
@Controller('he-thong-rap')
export class HeThongRapController {
  constructor(
    private readonly heThongRapService: HeThongRapService,
    private readonly responseHelperService: ResponseHelperService,
    private readonly rolesHelperService: RolesHelperService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  @Get('lay-danh-sach-he-thong-rap')
  async layDanhSachHeThongRap(@Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }

    dataRes = await this.heThongRapService.layDanhSachHeThongRap();

    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiParam({ name: "ma_he_thong_rap", type: Number, required: true, description: "ma_he_thong_rap :" })
  @Get("lay-thong-tin-chi-tiet-he-thong-rap/:ma_he_thong_rap")
  async layThongTinChiTietHeThongRap(
    @Param('ma_he_thong_rap') ma_he_thong_rap: number,
    @Response() res, @Request() req
  ) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: '',
      data: {},
    };

    dataRes = await this.heThongRapService.layThongTinChiTietHeThongRap(+ma_he_thong_rap);

    this.responseHelperService.sendResponse(res, dataRes);
  }


}
