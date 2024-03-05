import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateAdminDto extends PartialType(CreateUserDto) {
    @ApiProperty({ description: "user_id", type: String })
    user_id: number;
}
