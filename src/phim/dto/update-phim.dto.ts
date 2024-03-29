import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreatePhimDto } from './create-phim.dto';

export class UpdatePhimDto extends OmitType(CreatePhimDto, ['hinh_anh'] as const) {
    @ApiProperty({ description: "ma_phim", type: Number })
    ma_phim: number;
}
