import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Request, HttpStatus, UseGuards } from '@nestjs/common';
import { GheService } from './ghe.service';
import { CreateGheDto } from './dto/create-ghe.dto';
import { UpdateGheDto } from './dto/update-ghe.dto';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { RolesHelperService } from 'src/services/roles/roles-helper.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseData } from 'src/services/response/response.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/services/roles/rolesConstants';

@ApiTags("quan-ly-ghe")
@Controller('ghe')
export class GheController {
  constructor(
    private readonly gheService: GheService,
    private readonly responseHelperService: ResponseHelperService,
    private readonly rolesHelperService: RolesHelperService,
  ) { }


  @Get('lay-danh-sach-ghe')
  async layDanhSachGhe(@Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }

    dataRes = await this.gheService.layDanhSachGheService();

    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiParam({ name: "ma_rap", type: Number, required: true, description: "ma_rap :" })
  @Get("lay-danh-sach-ghe-theo-rap-phim/:ma_rap")
  async layDanhSachGheTheoRap(
    @Param('ma_rap') ma_rap: number,
    @Response() res, @Request() req
  ) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: '',
      data: {},
    };

    dataRes = await this.gheService.layDanhSachGheTheoRapService(+ma_rap);

    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiBody({ type: CreateGheDto })
  @UseGuards(JwtAuthGuard)
  @Post("them-ghe")
  async themGhe(@Response() res, @Request() req, @Body() newGhe: CreateGheDto) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.gheService.themGheService(newGhe);
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
  @ApiParam({ name: "ma_ghe", type: Number })
  @Delete("Xoa-ghe/:ma_ghe")
  async xoaGhe(@Response() res, @Request() req, @Param("ma_ghe") ma_ghe: number) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.gheService.xoaGheServices(+ma_ghe);
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }


}
