import { Controller, Get, Param, UseGuards, Response, HttpStatus, Request, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { ResponseData } from 'src/services/response/response.interface';
import { RolesHelperService } from 'src/services/roles/roles-helper.service';
import { Role } from 'src/services/roles/rolesConstants';
import { request } from 'http';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateAdminDto } from './dto/update-user-admin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';


@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseHelperService: ResponseHelperService,
    private readonly rolesHelperService: RolesHelperService,
  ) { }

  @ApiBearerAuth()
  @ApiParam({ name: "page", required: true, description: "page :" })
  @ApiParam({ name: "size", required: true, description: "size :" })
  @UseGuards(JwtAuthGuard)
  @Get("layDanhSachNguoiDungPhanTrang/:page/:size")
  async layDanhSachNguoiDungPhanTrang(@Param("page") page, @Param("size") size, @Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.userService.layDanhSachNguoiDungPhanTrangService(+page, +size);
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
  @Get('lay-danh-sach-nguoi-dung')
  async layDanhSachNguoiDung(@Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.userService.layDanhSachNguoiDungService();
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiParam({ name: "hoTen", type: String })
  @UseGuards(JwtAuthGuard)
  @Get('tim-kiem-nguoi-dung-theo-ho-ten/:hoTen')
  async timKiemNguoiDungTheoHoTen(@Response() res, @Request() req, @Param("hoTen") hoTen) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.userService.timkiemNguoiDungTheoHoTenService(hoTen);
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiParam({ name: "hoTen", type: String })
  @ApiParam({ name: "page", type: Number })
  @ApiParam({ name: "size", type: Number })
  @UseGuards(JwtAuthGuard)
  @Get('tim-kiem-nguoi-dung-theo-ho-ten-phan-trang/:hoTen/:page/:size')
  async timKiemNguoiDungTheoHoTenPhanTrang(@Response() res, @Request() req, @Param("hoTen") hoTen, @Param("page") page, @Param("size") size) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.userService.timKiemNguoiDungTheoHoTenPhanTrangService(hoTen, +page, +size);
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
  @Get("lay-thong-tin-tai-khoan")
  async layThongTinTaiKhoan(@Response() res, @Request() req) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "lay thong tin tai khoan thanh cong",
      data: req.user
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiParam({ name: "userId", type: Number })
  @UseGuards(JwtAuthGuard)
  @Get("lay-thong-tin-nguoi-dung-by-userId/:userId")
  async layThongTinNguoiDungByUserId(@Response() res, @Request() req, @Param("userId") userId) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.userService.getUserByUserIdService(+userId);
      if (dataRes.status == HttpStatus.OK) {
        dataRes.message = "lay thong tin nguoi dung thanh cong!"
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
  @ApiBody({ type: CreateUserDto })
  @UseGuards(JwtAuthGuard)
  @Post("them-nguoi-dung")
  async themNguoiDung(@Response() res, @Request() req, @Body() newUser: CreateUserDto) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.userService.themNguoiDungService(newUser);
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(JwtAuthGuard)
  @Put("cap-nhat-thong-tin-nguoi-dung-user")
  async capNhatThongTinNguoiDungUser(@Response() res, @Request() req, @Body() userUpdate: UpdateUserDto) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (req.user.user_id != userUpdate.user_id) {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      };
    } else {
      dataRes = await this.userService.capNhatThongTinNguoiDungUserService(userUpdate);
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiBody({ type: UpdateAdminDto })
  @UseGuards(JwtAuthGuard)
  @Put("cap-nhat-thong-tin-nguoi-dung-by-Admin")
  async capNhatThongTinNguoiDungByAdmin(@Response() res, @Request() req, @Body() userUpdate: UpdateAdminDto) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.userService.capNhatThongTinNguoiDungAdminService(userUpdate);
    } else {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    }
    this.responseHelperService.sendResponse(res, dataRes);
  }

  @ApiBearerAuth()
  @ApiParam({ name: "user_id", type: Number })
  @UseGuards(JwtAuthGuard)
  @Delete("xoa-nguoi-dung/:user_id")
  async xoaNguoiDungByAdmin(@Response() res, @Request() req, @Param("user_id") user_id) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }
    if (this.rolesHelperService.checkRole(req.user, Role.Admin)) {
      dataRes = await this.userService.xoaNguoiDungService(+user_id);
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
  @ApiBody({ type: UpdatePasswordDto })
  @Post("thay-doi-mat-khau")
  async thayDoiMatKhau(@Request() req, @Response() res, @Body() updatePass: UpdatePasswordDto) {
    let dataRes: ResponseData = {
      status: HttpStatus.OK,
      message: "",
      data: {}
    }

    if (req.user?.user_id !== updatePass.user_id) {
      dataRes = {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden resource"
      }
    } else {
      dataRes = await this.userService.thayDoiMatKhauService(updatePass);
    }

    this.responseHelperService.sendResponse(res, dataRes);

  }

}
