import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, ['mat_khau', 'loai_nguoi_dung'] as const) {
    @ApiProperty({ description: "user_id", type: String })
    user_id: number;
}
