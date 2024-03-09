import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateQuanLyVeDto } from './create-quan-ly-ve.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateVeAdminDto extends PartialType(CreateQuanLyVeDto) {
    @IsNotEmpty()
    @ApiProperty({ description: "user_id", type: Number })
    user_id: number;
}
