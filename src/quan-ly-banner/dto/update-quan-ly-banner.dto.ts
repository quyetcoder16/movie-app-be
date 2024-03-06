import { PartialType } from '@nestjs/swagger';
import { CreateQuanLyBannerDto } from './create-quan-ly-banner.dto';

export class UpdateQuanLyBannerDto extends PartialType(CreateQuanLyBannerDto) {}
