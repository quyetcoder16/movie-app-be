// response-helper.service.ts
import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { ResponseData } from './response.interface';

@Injectable()
export class ResponseHelperService {
    sendResponse(@Res() res: Response, responseData: ResponseData): void {
        res.status(responseData.status).json(responseData);
    }

    createResponse(status: number, message: string, data?: any): ResponseData {
        return { status, message, data };
    }
}
