import { Controller, Get, Param, UseGuards, Response, HttpStatus, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { ResponseData } from 'src/services/response/response.interface';
import { RolesHelperService } from 'src/services/roles/roles-helper.service';
import { Role } from 'src/services/roles/rolesConstants';


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

}
