import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Request, HttpStatus, UseGuards, Put } from '@nestjs/common';
import { CumRapService } from './cum-rap.service';
import { CreateCumRapDto } from './dto/create-cum-rap.dto';
import { UpdateCumRapDto } from './dto/update-cum-rap.dto';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { RolesHelperService } from 'src/services/roles/roles-helper.service';
import { ResponseData } from 'src/services/response/response.interface';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/services/roles/rolesConstants';

@ApiTags("quan-ly-cum-rap")
@Controller('cum-rap')
export class CumRapController {
  constructor(
    private readonly cumRapService: CumRapService,
    private readonly responseHelperService: ResponseHelperService,
    private readonly rolesHelperService: RolesHelperService,
  ) { }


  @Get('lay-danh-sach-cum-rap')
  async layDanhSachCumRap(@Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }

    dataRes = await this.cumRapService.layDanhSachCumRapService();

    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiParam({ name: "ma_he_thong_rap", type: Number, required: true, description: "ma_he_thong_rap :" })
  @Get("lay-thong-tin-cum-rap-theo-he-thong-rap/:ma_he_thong_rap")
  async layThongTinCumRapTheoMaHTR(
    @Param('ma_he_thong_rap') ma_he_thong_rap: number,
    @Response() res, @Request() req
  ) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: '',
      data: {},
    };

    dataRes = await this.cumRapService.layThongTinCumRapTheoHeThongRapServices(+ma_he_thong_rap);

    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiBody({ type: CreateCumRapDto })
  @UseGuards(JwtAuthGuard)
  @Post("them-cum-rap")
  async themCumRap(@Response() res, @Request() req, @Body() newCumRap: CreateCumRapDto) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.cumRapService.themCumRapService(newCumRap);
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiBody({ type: UpdateCumRapDto })
  @UseGuards(JwtAuthGuard)
  @Put("cap-nhat-cum-rap")
  async capNhatCumRap(@Response() res, @Request() req, @Body() updateCumRap: UpdateCumRapDto) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.cumRapService.capNhatCumRapService(updateCumRap);
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
  @ApiParam({ name: "ma_cum_rap", type: Number })
  @Delete("Xoa-cum-rap/:ma_cum_rap")
  async xoaCumRap(@Response() res, @Request() req, @Param("ma_cum_rap") ma_cum_rap: number) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.cumRapService.xoaCumRapService(+ma_cum_rap);
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }

}
