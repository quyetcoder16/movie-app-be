import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateLichChieuDto {

    @IsNotEmpty()
    @ApiProperty({ description: "ma_rap", type: Number })
    ma_rap: number;

    @IsNotEmpty()
    @ApiProperty({ description: "ma_phim", type: Number })
    ma_phim: number;

    @IsNotEmpty()
    @ApiProperty({ description: "ngay_gio_chieu", type: String })
    @IsDateString()
    ngay_gio_chieu: string;

    @IsNotEmpty()
    @ApiProperty({ description: "gia_ve", type: Number })
    gia_ve: number;

}
