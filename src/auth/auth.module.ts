import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ResponseModule } from 'src/services/response/response.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ResponseModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
