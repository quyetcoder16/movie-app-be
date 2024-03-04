import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { ResponseData } from 'src/services/response/response.interface';
import { UserService } from 'src/user/user.service';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { SignInDTO } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly responseHelperService: ResponseHelperService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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
      const user = await this.userService.getUserByEmailService(newUser.email);
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

      return this.responseHelperService.createResponse(HttpStatus.CREATED, "sign up successful!", newUser);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server is error", error);
    }
  }

  async validateUserByJwt(payload: any) {

    const user: ResponseData = await this.userService.getUserByUserIdService(payload.userId);
    return user.data;
  }

  async dangNhapService(userLogin: SignInDTO): Promise<ResponseData> {
    try {
      const checkUser = await this.userService.getUserByEmailService(userLogin.email);
      if (checkUser.status == HttpStatus.NOT_FOUND) {
        return this.responseHelperService.createResponse(HttpStatus.NOT_FOUND, "email is not found!");
      }

      const isValidPassword = this.isValidPassword(userLogin.mat_khau, checkUser.data.mat_khau);

      if (isValidPassword) {
        const payload = { userId: checkUser.data.user_id };
        const access_token = this.jwtService.sign(payload, {
          secret: this.configService.get<string>("SECRET_KEY"),
          expiresIn: this.configService.get<string>("EXPIRES_IN")
        });
        return this.responseHelperService.createResponse(HttpStatus.OK, "sign in successful!", {
          access_token
        });
      }

      return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "password incorrect!");


    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server is error", error);
    }
  }


}
