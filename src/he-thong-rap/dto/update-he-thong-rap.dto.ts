import { PartialType } from '@nestjs/swagger';
import { CreateHeThongRapDto } from './create-he-thong-rap.dto';

export class UpdateHeThongRapDto extends PartialType(CreateHeThongRapDto) {}
