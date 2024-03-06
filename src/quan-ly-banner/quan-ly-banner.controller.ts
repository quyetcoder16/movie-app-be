import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Response, HttpStatus } from '@nestjs/common';
import { QuanLyBannerService } from './quan-ly-banner.service';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { RolesHelperService } from 'src/services/roles/roles-helper.service';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseData } from 'src/services/response/response.interface';
import { Role } from 'src/services/roles/rolesConstants';

@ApiTags("quan-ly-banner")
@Controller('quan-ly-banner')
export class QuanLyBannerController {
  constructor(
    private readonly quanLyBannerService: QuanLyBannerService,
    private readonly responseHelperService: ResponseHelperService,
    private readonly rolesHelperService: RolesHelperService,
    private cloudinaryService: CloudinaryService,
  ) { }

  @Get('lay-danh-sach-banner')
  async layDanhSachBanner(@Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }

    dataRes = await this.quanLyBannerService.layDanhSachBannerService();

    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: "ma_banner", type: Number })
  @Delete('lay-danh-sach-banner/:ma_banner')
  async xoaBanner(@Response() res, @Request() req, @Param("ma_banner") ma_banner) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.quanLyBannerService.xoaBannerByMaBannerService(+ma_banner);
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }



}
