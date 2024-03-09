import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateHeThongRapDto } from './create-he-thong-rap.dto';

export class UpdateHeThongRapDto extends PartialType(CreateHeThongRapDto) {
    @ApiProperty({ name: "ma_he_thong_rap", type: Number })
    ma_he_thong_rap: number;
}
