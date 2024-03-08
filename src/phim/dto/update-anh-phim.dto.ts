import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreatePhimDto } from './create-phim.dto';

export class UpdateAnhPhimDto extends OmitType(CreatePhimDto, ['ten_phim', 'dang_chieu', 'danh_gia', 'hot', 'mo_ta', 'ngay_khoi_chieu', 'sap_chieu', 'trailer'] as const) {
    @ApiProperty({ description: "ma_phim", type: Number })
    ma_phim: number;
}
