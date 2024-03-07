import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Request, HttpStatus } from '@nestjs/common';
import { PhimService } from './phim.service';
import { CreatePhimDto } from './dto/create-phim.dto';
import { UpdatePhimDto } from './dto/update-phim.dto';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { RolesHelperService } from 'src/services/roles/roles-helper.service';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { ApiTags } from '@nestjs/swagger';
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

}
