import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCumRapDto {
    @IsNotEmpty()
    @ApiProperty({ description: "ten_cum_rap", type: String })
    ten_cum_rap: string;

    @IsNotEmpty()
    @ApiProperty({ description: "dia_chi", type: String })
    dia_chi: string;

    @IsNotEmpty()
    @ApiProperty({ name: "ma_he_thong_rap", type: Number })
    ma_he_thong_rap: number;
}
