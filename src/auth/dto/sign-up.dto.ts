import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class SignUpDTO {
    @ApiProperty({ description: "email", type: String })
    @IsEmail()
    email: string;

    @ApiProperty({ description: "mat_khau", type: String })
    @Length(6, 32)
    mat_khau: string;

    @ApiProperty({ description: "ho_ten", type: String })
    ho_ten: string;

    @ApiProperty({ description: "so_dt", type: String })
    @Length(10, 20)
    so_dt: string;
}
