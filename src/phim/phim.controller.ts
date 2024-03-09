import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Request, HttpStatus, UseGuards, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { PhimService } from './phim.service';
import { CreatePhimDto } from './dto/create-phim.dto';
import { UpdatePhimDto } from './dto/update-phim.dto';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { RolesHelperService } from 'src/services/roles/roles-helper.service';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseData } from 'src/services/response/response.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/services/roles/rolesConstants';
import { UpdateAnhPhimDto } from './dto/update-anh-phim.dto';

@ApiTags("quan-ly-phim")
@Controller('phim')
export class PhimController {
  constructor(
    private readonly phimService: PhimService,
    private readonly responseHelperService: ResponseHelperService,
    private readonly rolesHelperService: RolesHelperService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  @Get('lay-danh-sach-phim')
  async layDanhSachBanner(@Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }

    dataRes = await this.phimService.layDanhSachPhimService();
    this.responseHelperService.sendResponse(res, dataRes);
  }


  @ApiParam({ name: "page", required: true, description: "page :" })
  @ApiParam({ name: "size", required: true, description: "size :" })
  @Get("lay-danh-sach-phim-phan-trang/:page/:size")
  async LayDanhSachPhimPhanTrang(@Param("page") page, @Param("size") size, @Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    dataRes = await this.phimService.layDanhSachPhimPhanTrangService(+page, +size);
    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiParam({ name: "page", type: Number, required: true, description: "page :" })
  @ApiParam({ name: "size", type: Number, required: true, description: "size :" })
  @ApiParam({ name: 'tuNgay', type: String, required: true, description: 'tuNgay (YYYY-MM-DD format):' })
  @ApiParam({ name: 'denNgay', type: String, required: true, description: 'denNgay (YYYY-MM-DD format):' })
  @Get("lay-danh-sach-phim-theo-ngay/:page/:size/:tuNgay/:denNgay")
  async layDanhSachPhimTheoNgay(
    @Param("page") page: number,
    @Param("size") size: number,
    @Param('tuNgay') tuNgay: string,
    @Param('denNgay') denNgay: string,
    @Response() res, @Request() req) {

    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateFormat.test(tuNgay) || !dateFormat.test(denNgay)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: 'Ngày không hợp lệ. Vui lòng sử dụng định dạng YYYY-MM-DD.'
      });
    }

    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: '',
      data: {},
    };
    dataRes = await this.phimService.layDanhSachTheoNgayService(new Date(tuNgay), new Date(denNgay), +page, +size);
    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiParam({ name: "ma_phim", type: Number, required: true, description: "ma_phim :" })
  @Get("lay-thong-tin-chi-tiet-phim/:ma_phim")
  async layThongTinChiTietPhim(
    @Param('ma_phim') ma_phim: number,
    @Response() res, @Request() req
  ) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: '',
      data: {},
    };

    dataRes = await this.phimService.layThongTinChiTietPhimTheoMaPhimService(+ma_phim);

    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('hinh_anh'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'tao phim moi',
    type: CreatePhimDto,
  })
  @Post('them-phim')
  async themPhim(@UploadedFile() hinh_anh, @Body() newPhim: CreatePhimDto, @Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      if ((+newPhim.danh_gia) < 1 || (+newPhim.danh_gia) > 5) {
        dataRes = {
          status: HttpStatus.BAD_REQUEST,
          message: "danh gia phai tu 1 -> 5!"
        }
      } else {
        const dataUrl = await this.cloudinaryService.uploadImage(hinh_anh);
        dataRes = await this.phimService.themPhimService(dataUrl?.url, newPhim);
      }
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
  @ApiParam({ name: "ma_phim", type: Number })
  @Delete('xoa-phim/:ma_phim')
  async xoaBanner(@Response() res, @Request() req, @Param("ma_phim") ma_phim) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.phimService.xoaPhimService(+ma_phim);
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiBody({ type: UpdatePhimDto })
  @UseGuards(JwtAuthGuard)
  @Put("cap-nhat-thong-tin-phim")
  async capNhatThongTinNguoiDungByAdmin(@Response() res, @Request() req, @Body() phimUpdate: UpdatePhimDto) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {

      if ((+phimUpdate.danh_gia) < 1 || (+phimUpdate.danh_gia) > 5) {
        dataRes = {
          status: HttpStatus.BAD_REQUEST,
          message: "danh gia phai tu 1 -> 5!"
        }
      } else {
        dataRes = await this.phimService.capNhatThongTinPhimService(phimUpdate);
      }
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
  @UseInterceptors(FileInterceptor('hinh_anh'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'thay doi anh phim',
    type: UpdateAnhPhimDto,
  })
  @Put('thay-doi-anh-cho-phim')
  async thayDoiAnhPhim(@UploadedFile() hinh_anh, @Body() updateAnhPhim: UpdateAnhPhimDto, @Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {

      const checkPhimExist: ResponseData = await this.phimService.layThongTinChiTietPhimTheoMaPhimService(+updateAnhPhim.ma_phim);
      if (checkPhimExist.status === HttpStatus.OK) {
        const dataUrl = await this.cloudinaryService.uploadImage(hinh_anh);
        dataRes = await this.phimService.capNhatHinhAnhPhimService(dataUrl?.url, checkPhimExist);
      } else {
        dataRes = {
          status: HttpStatus.NOT_FOUND,
          message: "phim khong ton tai!"
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
