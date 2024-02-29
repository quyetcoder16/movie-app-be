import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { ResponseData } from 'src/services/response/response.interface';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly responseHelperService: ResponseHelperService,
    private readonly userService: UserService,
  ) { }

  async dangKyService(newUser: SignUpDTO): Promise<ResponseData> {
    try {
      const user = await this.userService.getUserByEmail(newUser.email);
      return this.responseHelperService.createResponse(HttpStatus.OK, "dang ky thanh cong", user);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server is error", error);
    }
  }

}
