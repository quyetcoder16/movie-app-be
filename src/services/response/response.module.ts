import { Module } from '@nestjs/common';
import { ResponseHelperService } from './response-helper.service';


@Module({
    providers: [ResponseHelperService],
    exports: [ResponseHelperService],
})
export class ResponseModule { }