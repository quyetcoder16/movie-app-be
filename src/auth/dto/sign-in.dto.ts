import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class SignInDTO {
    @ApiProperty({ description: "email", type: String })
    @IsEmail()
    email: string;

    @ApiProperty({ description: "mat_khau", type: String })
    @Length(6, 25)
    mat_khau: string;

}
