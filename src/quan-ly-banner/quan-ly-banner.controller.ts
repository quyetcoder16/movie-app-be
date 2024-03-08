import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Response, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { QuanLyBannerService } from './quan-ly-banner.service';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { RolesHelperService } from 'src/services/roles/roles-helper.service';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseData } from 'src/services/response/response.interface';
import { Role } from 'src/services/roles/rolesConstants';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBannerDto } from './dto/create-quan-ly-banner.dto';
import { PhimService } from 'src/phim/phim.service';

@ApiTags("quan-ly-banner")
@Controller('quan-ly-banner')
export class QuanLyBannerController {
  constructor(
    private readonly quanLyBannerService: QuanLyBannerService,
    private readonly responseHelperService: ResponseHelperService,
    private readonly rolesHelperService: RolesHelperService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly phimService: PhimService,
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
  @Delete('xoa-banner/:ma_banner')
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload image and data',
    type: CreateBannerDto,
  })
  @Post('tao-banner')
  async taoBanner(@UploadedFile() image, @Body() newBanner: CreateBannerDto, @Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      const checkPhimExist: ResponseData = await this.phimService.layThongTinChiTietPhimTheoMaPhimService(+newBanner.ma_phim);
      if (checkPhimExist.status !== HttpStatus.OK) {
        dataRes = {
          status: HttpStatus.BAD_REQUEST,
          message: "phim khong ton tai!"
        }
      } else {
        const dataUpload = await this.cloudinaryService.uploadImage(image);
        dataRes = await this.quanLyBannerService.taoBannerService(dataUpload?.url, newBanner.ma_phim);
      }
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }

}
