import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateHeThongRapDto {
    @IsNotEmpty()
    @ApiProperty({ description: "ten_he_thong_rap", type: String })
    ten_he_thong_rap: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    logo: any;
}
