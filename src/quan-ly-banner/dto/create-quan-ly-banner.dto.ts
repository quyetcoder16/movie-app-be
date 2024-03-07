import { ApiProperty } from "@nestjs/swagger";

export class CreateBannerDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    image: any;

    @ApiProperty({ description: "ma_phim", type: Number })
    ma_phim: number;
}
