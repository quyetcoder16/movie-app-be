import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Response, Request, UseGuards, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { HeThongRapService } from './he-thong-rap.service';
import { CreateHeThongRapDto } from './dto/create-he-thong-rap.dto';
import { UpdateHeThongRapDto } from './dto/update-he-thong-rap.dto';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { RolesHelperService } from 'src/services/roles/roles-helper.service';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseData } from 'src/services/response/response.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/services/roles/rolesConstants';

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

    dataRes = await this.heThongRapService.layDanhSachHeThongRapService();

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

    dataRes = await this.heThongRapService.layThongTinChiTietHeThongRapService(+ma_he_thong_rap);

    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('logo'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'them he thong rap',
    type: CreateHeThongRapDto,
  })
  @Post('them-he-thong-rap')
  async themHeThongRap(@UploadedFile() logo, @Body() newHTR: CreateHeThongRapDto, @Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {

      const dataUrl = await this.cloudinaryService.uploadImage(logo);
      dataRes = await this.heThongRapService.themHeThongRapService(dataUrl?.url, newHTR);

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
  @ApiParam({ name: "ma_he_thong_rap", type: Number })
  @Delete('xoa-he-thong-rap/:ma_he_thong_rap')
  async xoaBanner(@Response() res, @Request() req, @Param("ma_he_thong_rap") ma_he_thong_rap) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.heThongRapService.xoaHeThongRapService(+ma_he_thong_rap);
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
  @UseInterceptors(FileInterceptor('logo'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: "update he thong rap",
    type: UpdateHeThongRapDto,
  })
  @Put("cap-nhat-he-thong-rap")
  async thayDoiAnhPhim(@UploadedFile() logo, @Body() updateHTR: UpdateHeThongRapDto, @Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {

      const checkHTR: ResponseData = await this.heThongRapService.layThongTinChiTietHeThongRapService(+updateHTR.ma_he_thong_rap);
      if (checkHTR.status === HttpStatus.OK) {
        const dataUrl = await this.cloudinaryService.uploadImage(logo);
        dataRes = await this.heThongRapService.capNhatHeThongRapService(dataUrl?.url, checkHTR, updateHTR);
      } else {
        dataRes = {
          status: HttpStatus.NOT_FOUND,
          message: "he thong rap khong ton tai!"
        }
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
