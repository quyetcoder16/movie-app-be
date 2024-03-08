import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsIn, IsNotEmpty } from "class-validator";

export class CreatePhimDto {
    @IsNotEmpty()
    @ApiProperty({ description: "ten_phim", type: String })
    ten_phim: string;

    @ApiProperty({ description: "trailer", type: String })
    trailer: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    hinh_anh: any;

    @ApiProperty({ description: "mo_ta", type: String })
    mo_ta: string;

    @IsNotEmpty()
    @ApiProperty({ description: "ngay_khoi_chieu", type: String })
    @IsDateString()
    ngay_khoi_chieu: string;

    @IsNotEmpty()
    @ApiProperty({ description: "danh_gia", type: Number })
    danh_gia: number;

    @ApiProperty({ description: "hot", type: Boolean })
    hot: boolean;

    @ApiProperty({ description: "dang_chieu", type: Boolean })
    dang_chieu: boolean;

    @ApiProperty({ description: "sap_chieu", type: Boolean })
    sap_chieu: boolean;

}
