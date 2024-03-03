import { Module } from '@nestjs/common';
import { RolesHelperService } from './roles-helper.service';


@Module({
    providers: [RolesHelperService],
    exports: [RolesHelperService],
})
export class RolesModule { }