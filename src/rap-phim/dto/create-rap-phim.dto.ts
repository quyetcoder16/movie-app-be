import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRapPhimDto {
    @IsNotEmpty()
    @ApiProperty({ description: "ten_rap", type: String })
    ten_rap: string;

    @IsNotEmpty()
    @ApiProperty({ name: "ma_cum_rap", type: Number })
    ma_cum_rap: number;
}
