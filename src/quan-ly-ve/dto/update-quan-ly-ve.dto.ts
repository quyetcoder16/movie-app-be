import { PartialType } from '@nestjs/swagger';
import { CreateQuanLyVeDto } from './create-quan-ly-ve.dto';

export class UpdateQuanLyVeDto extends PartialType(CreateQuanLyVeDto) {}
