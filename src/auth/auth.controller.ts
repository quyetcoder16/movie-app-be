import { Body, Controller, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignUpDTO } from './dto/sign-up.dto';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { ResponseData } from 'src/services/response/response.interface';

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
    const data: ResponseData = await this.authService.dangKyService(newUser);
    this.responseHelperService.sendResponse(res, data);
  }

}
