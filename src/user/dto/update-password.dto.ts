import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class UpdatePasswordDto {
    @ApiProperty({ description: "user_id", type: Number })
    user_id: number;

    @ApiProperty({ description: "mat_khau_cu", type: String })
    @Length(6, 32)
    mat_khau_cu: string;

    @ApiProperty({ description: "mat_khau_moi", type: String })
    @Length(6, 32)
    mat_khau_moi: string;
}
