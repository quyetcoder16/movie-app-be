import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRapPhimDto } from './create-rap-phim.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateRapPhimDto extends PartialType(CreateRapPhimDto) {
    @IsNotEmpty()
    @ApiProperty({ name: "ma_rap", type: Number })
    ma_rap: number;
}
