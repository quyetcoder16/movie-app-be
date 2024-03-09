import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateGheDto {
    @IsNotEmpty()
    @ApiProperty({ description: "ten_ghe", type: String })
    ten_ghe: string;

    @IsNotEmpty()
    @ApiProperty({ description: "loai_ghe", type: String })
    loai_ghe: string;

    @IsNotEmpty()
    @ApiProperty({ name: "ma_rap", type: Number })
    ma_rap: number;
}
