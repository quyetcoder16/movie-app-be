import { Body, Controller, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignUpDTO } from './dto/sign-up.dto';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { ResponseData } from 'src/services/response/response.interface';
import { SignInDTO } from './dto/sign-in.dto';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseHelperService: ResponseHelperService,
  ) { }

  @ApiBody({ type: SignUpDTO })
  @Post("dang-ky")
  async dangKy(@Body() newUser: SignUpDTO, @Response() res) {
    const data: ResponseData = await this.authService.dangKyService(newUser, "user");
    this.responseHelperService.sendResponse(res, data);
  }

  @ApiBody({ type: SignInDTO })
  @Post("dang-nhap")
  async dangNhap(@Body() user: SignInDTO, @Response() res) {
    const data: ResponseData = await this.authService.dangNhapService(user);
    this.responseHelperService.sendResponse(res, data);
  }

}
