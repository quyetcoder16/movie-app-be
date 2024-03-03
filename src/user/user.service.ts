import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { ResponseData } from 'src/services/response/response.interface';

@Injectable()
export class UserService {

  constructor(private readonly responseHelperService: ResponseHelperService) { }

  prisma = new PrismaClient();

  async getUserByEmail(email: string): Promise<ResponseData> {
    try {
      const user = await this.prisma.nguoiDung.findFirst({
        where: {
          email
        }
      });
      if (user) {
        return this.responseHelperService.createResponse(HttpStatus.OK, "user is exits", user);
      }
      return this.responseHelperService.createResponse(HttpStatus.NOT_FOUND, "user is not found");
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async getUserByUserId(userId: number): Promise<ResponseData> {
    try {
      // console.log("test");
      const user = await this.prisma.nguoiDung.findFirst({
        where: {
          user_id: userId
        }
      });
      if (user) {
        return this.responseHelperService.createResponse(HttpStatus.OK, "user is exits", user);
      }
      return this.responseHelperService.createResponse(HttpStatus.NOT_FOUND, "user is not found");
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async layDanhSachNguoiDungPhanTrangService(page: number, size: number): Promise<ResponseData> {
    try {

      const listUser = await this.prisma.nguoiDung.findMany({
        skip: ((page - 1) * size),
        take: size
      });
      return this.responseHelperService.createResponse(HttpStatus.OK, "lay danh sach nguoi dung phan trang thanh cong!", listUser);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

}
