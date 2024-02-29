import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { ResponseData } from 'src/services/response/response.interface';
import { UserService } from 'src/user/user.service';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { SignInDTO } from './dto/sign-in.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly responseHelperService: ResponseHelperService,
    private readonly userService: UserService,
  ) { }

  prisma = new PrismaClient();

  isValidPassword = (password: string, hashPassword: string): boolean => {
    return bcrypt.compareSync(password, hashPassword);
  }

  generateHashPassword = async (password: string): Promise<string> => {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash
  }

  async dangKyService(newUser: SignUpDTO, loaiNguoiDung: string): Promise<ResponseData> {
    try {
      const user = await this.userService.getUserByEmail(newUser.email);
      if (user.status == HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "user is existed");
      }

      const hashPassWord = await this.generateHashPassword(newUser.mat_khau);

      const objNewUser = {
        ...newUser,
        mat_khau: hashPassWord,
        loai_nguoi_dung: loaiNguoiDung
      }

      await this.prisma.nguoiDung.create({
        data: objNewUser
      });

      return this.responseHelperService.createResponse(HttpStatus.OK, "sign up successful!", newUser);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server is error", error);
    }
  }

  async dangNhapService(user: SignInDTO): Promise<ResponseData> {
    try {
      const checkUser = await this.userService.getUserByEmail(user.email);
      if (checkUser.status == HttpStatus.NOT_FOUND) {
        return this.responseHelperService.createResponse(HttpStatus.NOT_FOUND, "email is not found!");
      }


      


    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server is error", error);
    }
  }

}
