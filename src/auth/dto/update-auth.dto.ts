import { PartialType } from '@nestjs/swagger';
import { SignUpDTO } from './sign-up.dto';


export class UpdateAuthDto extends PartialType(SignUpDTO) { }
