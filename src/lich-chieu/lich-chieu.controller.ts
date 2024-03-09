import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Request, HttpStatus, UseGuards, Put } from '@nestjs/common';
import { LichChieuService } from './lich-chieu.service';
import { CreateLichChieuDto } from './dto/create-lich-chieu.dto';
import { UpdateLichChieuDto } from './dto/update-lich-chieu.dto';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { RolesHelperService } from 'src/services/roles/roles-helper.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseData } from 'src/services/response/response.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/services/roles/rolesConstants';

@ApiTags("quan-ly-lich-chieu")
@Controller('lich-chieu')
export class LichChieuController {
  constructor(
    private readonly lichChieuService: LichChieuService,
    private readonly responseHelperService: ResponseHelperService,
    private readonly rolesHelperService: RolesHelperService,
  ) { }

  @ApiParam({ name: "ma_phim", type: Number, required: true, description: "ma_phim :" })
  @Get("lay-danh-sach-lich-chieu-theo-ma-phim/:ma_phim")
  async layDanhSachLichChieuTheoMaPhim(
    @Param('ma_phim') ma_phim: number,
    @Response() res, @Request() req
  ) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: '',
      data: {},
    };

    dataRes = await this.lichChieuService.layThongTinLichChieuTheoMaPhim(+ma_phim);

    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiBody({ type: CreateLichChieuDto })
  @UseGuards(JwtAuthGuard)
  @Post("tao-lich-chieu")
  async taoLichChieu(@Response() res, @Request() req, @Body() newLich: CreateLichChieuDto) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.lichChieuService.taoLichChieuService(newLich);
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiBody({ type: UpdateLichChieuDto })
  @UseGuards(JwtAuthGuard)
  @Put("chinh-sua-lich-chieu")
  async chinhSuaLichChieu(@Response() res, @Request() req, @Body() updateLich: UpdateLichChieuDto) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.lichChieuService.chinhSuaLichChieuService(updateLich);
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: "ma_lich_chieu", type: Number })
  @Delete("Xoa-lich-chieu/:ma_lich_chieu")
  async xoaLichChieu(@Response() res, @Request() req, @Param("ma_lich_chieu") ma_lich_chieu: number) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.lichChieuService.xoaLichChieuSerVice(+ma_lich_chieu);
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }

}
