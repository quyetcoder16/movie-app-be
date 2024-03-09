import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Request, HttpStatus, UseGuards, Put } from '@nestjs/common';
import { RapPhimService } from './rap-phim.service';
import { CreateRapPhimDto } from './dto/create-rap-phim.dto';
import { UpdateRapPhimDto } from './dto/update-rap-phim.dto';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { RolesHelperService } from 'src/services/roles/roles-helper.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseData } from 'src/services/response/response.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/services/roles/rolesConstants';

@ApiTags("quan-ly-rap-phim")
@Controller('rap-phim')
export class RapPhimController {
  constructor(
    private readonly rapPhimService: RapPhimService,
    private readonly responseHelperService: ResponseHelperService,
    private readonly rolesHelperService: RolesHelperService,
  ) { }

  @Get('lay-danh-sach-rap-phim')
  async layDanhSachRapPhim(@Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }

    dataRes = await this.rapPhimService.layDanhSachRapPhimService();

    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiParam({ name: "ma_cum_rap", type: Number, required: true, description: "ma_cum_rap :" })
  @Get("lay-thong-tin-rap-phim-theo-cum-rap/:ma_cum_rap")
  async layThongTinRapPhimTheoCumRap(
    @Param('ma_cum_rap') ma_cum_rap: number,
    @Response() res, @Request() req
  ) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: '',
      data: {},
    };

    dataRes = await this.rapPhimService.layThongTinRapPhimTheoCumRapService(+ma_cum_rap);

    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiBody({ type: CreateRapPhimDto })
  @UseGuards(JwtAuthGuard)
  @Post("them-rap-phim")
  async themRapPhim(@Response() res, @Request() req, @Body() newRap: CreateRapPhimDto) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.rapPhimService.themRapPhimService(newRap);
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }


  @ApiBearerAuth()
  @ApiBody({ type: UpdateRapPhimDto })
  @UseGuards(JwtAuthGuard)
  @Put("cap-nhat-rap-phim")
  async capNhatRapPhim(@Response() res, @Request() req, @Body() updateRap: UpdateRapPhimDto) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.rapPhimService.capNhatRapPhimService(updateRap);
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
  @ApiParam({ name: "ma_rap", type: Number })
  @Delete("Xoa-rap-phim/:ma_rap")
  async xoaRapPhim(@Response() res, @Request() req, @Param("ma_rap") ma_rap: number) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.rapPhimService.xoaRapPhimService(+ma_rap);
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }

}
