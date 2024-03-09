import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Response, Request, HttpStatus } from '@nestjs/common';
import { QuanLyVeService } from './quan-ly-ve.service';
import { CreateQuanLyVeDto } from './dto/create-quan-ly-ve.dto';
import { UpdateQuanLyVeDto } from './dto/update-quan-ly-ve.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { RolesHelperService } from 'src/services/roles/roles-helper.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseData } from 'src/services/response/response.interface';
import { Role } from 'src/services/roles/rolesConstants';
import { CreateVeAdminDto } from './dto/create-ve-admin.dto';

@ApiTags("quan-ly-ve")
@Controller('quan-ly-ve')
export class QuanLyVeController {
  constructor(
    private readonly quanLyVeService: QuanLyVeService,
    private readonly responseHelperService: ResponseHelperService,
    private readonly rolesHelperService: RolesHelperService,
  ) { }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("lay-danh-sach-ve-dat")
  async layDanhSachVeDat(@Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    dataRes = await this.quanLyVeService.layDanhSachVeByUserIdService(req?.user.user_id);
    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("lay-danh-sach-ve-dat-admin")
  async layDanhSachVeDatAdmin(@Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.quanLyVeService.layDanhSachVeDatAdminService();
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiBody({ type: CreateQuanLyVeDto })
  @UseGuards(JwtAuthGuard)
  @Post("dat-ve")
  async datVe(@Response() res, @Request() req, @Body() datVe: CreateQuanLyVeDto) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    dataRes = await this.quanLyVeService.datVeService(datVe, req?.user);
    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiParam({ name: "ma_ve", type: Number })
  @UseGuards(JwtAuthGuard)
  @Delete("huy-ve/:ma_ve")
  async huyDatVe(@Response() res, @Request() req, @Param("ma_ve") ma_ve) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }

    dataRes = await this.quanLyVeService.huyVeService(ma_ve, req?.user);

    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiBody({ type: CreateVeAdminDto })
  @UseGuards(JwtAuthGuard)
  @Post("dat-ve-admin")
  async datVeAdmin(@Response() res, @Request() req, @Body() datVe: CreateVeAdminDto) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.quanLyVeService.datVeAdminService(datVe);
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiParam({ name: "ma_ve", type: Number })
  @UseGuards(JwtAuthGuard)
  @Delete("huy-ve-admin/:ma_ve")
  async huyVeAdmin(@Response() res, @Request() req, @Param("ma_ve") ma_ve) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }

    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.quanLyVeService.huyVeAdminService(ma_ve);
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }

    this.responseHelperService.sendResponse(res, dataRes);
  }


}
