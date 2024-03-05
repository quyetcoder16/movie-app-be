import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseHelperService } from 'src/services/response/response-helper.service';
import { ResponseData } from 'src/services/response/response.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/services/roles/rolesConstants';
import * as bcrypt from "bcrypt";
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateAdminDto } from './dto/update-user-admin.dto';

@Injectable()
export class UserService {

  constructor(private readonly responseHelperService: ResponseHelperService) { }

  prisma = new PrismaClient();

  generateHashPassword = async (password: string): Promise<string> => {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash
  }

  async getUserByEmailService(email: string): Promise<ResponseData> {
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

  async getUserByUserIdService(userId: number): Promise<ResponseData> {
    try {
      if (userId) {
        const user = await this.prisma.nguoiDung.findFirst({
          where: {
            user_id: userId
          }
        });
        if (user) {
          return this.responseHelperService.createResponse(HttpStatus.OK, "user is exits", user);
        }
        return this.responseHelperService.createResponse(HttpStatus.NOT_FOUND, "user is not found");
      } else {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "user_id phai la so!");
      }
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

  async layDanhSachNguoiDungService(): Promise<ResponseData> {
    try {
      const listUser = await this.prisma.nguoiDung.findMany();
      return this.responseHelperService.createResponse(HttpStatus.OK, "lay danh sach nguoi dung thanh cong!", listUser);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async timkiemNguoiDungTheoHoTenService(hoTen: string): Promise<ResponseData> {
    try {
      const listUser = await this.prisma.nguoiDung.findMany({
        where: {
          ho_ten: {
            contains: hoTen,
          }
        }
      });
      return this.responseHelperService.createResponse(HttpStatus.OK, "tim kiem nguoi dung theo ten thanh cong!", listUser);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async timKiemNguoiDungTheoHoTenPhanTrangService(hoTen: string, page: number, size: number): Promise<ResponseData> {
    try {
      const listUser = await this.prisma.nguoiDung.findMany({
        where: {
          ho_ten: {
            contains: hoTen,
          }
        },
        skip: ((page - 1) * size),
        take: size
      });
      return this.responseHelperService.createResponse(HttpStatus.OK, "tim kiem nguoi dung theo ho ten phan trang thanh cong!", listUser);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async themNguoiDungService(newUser: CreateUserDto): Promise<ResponseData> {
    try {
      if (newUser.loai_nguoi_dung != Role.Admin && newUser.loai_nguoi_dung != Role.User) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "loai nguoi dung khong dung");
      }
      const checkUser = await this.getUserByEmailService(newUser.email);
      if (checkUser.status == HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "email da ton tai!");
      }
      const hashPass = await this.generateHashPassword(newUser.mat_khau);
      newUser = { ...newUser, mat_khau: hashPass };
      await this.prisma.nguoiDung.create({
        data: newUser
      });
      return this.responseHelperService.createResponse(HttpStatus.CREATED, "them nguoi dung thanh cong!", newUser);
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async capNhatThongTinNguoiDungUserService(userUpdate: UpdateUserDto): Promise<ResponseData> {
    try {
      const checkData = await this.getUserByEmailService(userUpdate.email);
      if (checkData.data?.user_id != userUpdate.user_id && checkData.status == HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "email da ton tai!");
      }
      userUpdate = {
        ...userUpdate,
        user_id: +userUpdate.user_id
      }
      await this.prisma.nguoiDung.update({
        where: {
          user_id: +userUpdate.user_id
        },
        data: userUpdate
      });
      return this.responseHelperService.createResponse(HttpStatus.OK, "cap nhat thong tin nguoi dung thanh cong");
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async capNhatThongTinNguoiDungAdminService(userUpdate: UpdateAdminDto): Promise<ResponseData> {
    try {

      const checkUserId = await this.getUserByUserIdService(+userUpdate.user_id);

      if (checkUserId.status !== HttpStatus.OK) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "user_id khong ton tai!");
      }

      const checkEmailExist = await this.getUserByEmailService(userUpdate.email);
      if (checkEmailExist.status === HttpStatus.OK && checkEmailExist.data?.user_id != userUpdate.user_id) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "email da ton tai!");
      }
      if (userUpdate.loai_nguoi_dung != Role.Admin && userUpdate.loai_nguoi_dung != Role.User) {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "loai nguoi dung sai!");
      }

      const hashPass = await this.generateHashPassword(userUpdate.mat_khau);

      userUpdate = {
        ...userUpdate,
        mat_khau: hashPass,
        user_id: +userUpdate.user_id
      }

      await this.prisma.nguoiDung.update({
        where: {
          user_id: +userUpdate.user_id
        },
        data: userUpdate
      })

      return this.responseHelperService.createResponse(HttpStatus.OK, "cap nhat nguoi dung thanh cong!");

    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error");
    }
  }

  async xoaNguoiDungService(user_id: number): Promise<ResponseData> {
    try {
      if (user_id) {
        const checkUserExist = await this.getUserByUserIdService(user_id);
        if (checkUserExist.status !== HttpStatus.OK) {
          return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "user_id khong ton tai!");
        }

        await this.prisma.nguoiDung.delete({
          where: {
            user_id: +user_id
          }
        });


        return this.responseHelperService.createResponse(HttpStatus.OK, "Xoa nguoi dung thanh cong!");

      } else {
        return this.responseHelperService.createResponse(HttpStatus.BAD_REQUEST, "user_id phai la so!");
      }
    } catch (error) {
      return this.responseHelperService.createResponse(HttpStatus.BAD_GATEWAY, "server error", error);
    }
  }

}
