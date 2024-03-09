import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLichChieuDto } from './create-lich-chieu.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateLichChieuDto extends PartialType(CreateLichChieuDto) {
    @IsNotEmpty()
    @ApiProperty({ description: "ma_lich_chieu", type: Number })
    ma_lich_chieu: number;
}
