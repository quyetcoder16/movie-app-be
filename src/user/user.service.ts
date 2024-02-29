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

}
