import { PartialType } from '@nestjs/swagger';
import { CreateBannerDto } from './create-quan-ly-banner.dto';

export class UpdateQuanLyBannerDto extends PartialType(CreateBannerDto) { }
