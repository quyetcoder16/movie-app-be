import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Request, HttpStatus } from '@nestjs/common';
import { PhimService } from './phim.service';
import { CreatePhimDto } from './dto/create-phim.dto';
import { UpdatePhimDto } from './dto/update-phim.dto';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { RolesHelperService } from 'src/services/roles/roles-helper.service';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseData } from 'src/services/response/response.interface';

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

}
