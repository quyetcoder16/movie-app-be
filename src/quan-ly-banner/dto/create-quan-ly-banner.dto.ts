import { ApiProperty } from "@nestjs/swagger";

export class CreateQuanLyBannerDto {
    @ApiProperty({ description: "ma_phim", type: Number })
    ma_phim: number;
}
