import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCumRapDto } from './create-cum-rap.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateCumRapDto extends PartialType(CreateCumRapDto) {
    @IsNotEmpty()
    @ApiProperty({ name: "ma_cum_rap", type: Number })
    ma_cum_rap: number;
}
