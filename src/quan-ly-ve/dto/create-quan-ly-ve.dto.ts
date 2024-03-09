import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateQuanLyVeDto {
    @IsNotEmpty()
    @ApiProperty({ description: "ma_lich_chieu", type: Number })
    ma_lich_chieu: number;

    @IsNotEmpty()
    @ApiProperty({ description: "ma_ghe", type: Number })
    ma_ghe: number;

}
