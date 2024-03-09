import { PartialType } from '@nestjs/swagger';
import { CreateGheDto } from './create-ghe.dto';

export class UpdateGheDto extends PartialType(CreateGheDto) {}
