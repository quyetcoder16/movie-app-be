import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class SignUpDTO {
    @ApiProperty({ description: "tai_khoan", type: String })
    tai_khoan: string;

    @ApiProperty({ description: "mat_khau", type: String })
    mat_khau: string;

    @ApiProperty({ description: "ho_ten", type: String })
    ho_ten: string;

    @ApiProperty({ description: "email", type: String })
    @IsEmail()
    email: string;

    @ApiProperty({ description: "so_dt", type: String })
    @Length(10, 20)
    so_dt: string;
}
