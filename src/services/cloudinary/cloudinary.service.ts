// tạo fuction upload 

import { Inject, Injectable } from "@nestjs/common";
import { UploadApiErrorResponse, UploadApiResponse, v2 } from "cloudinary";
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolver, reject) => {
            const upload = v2.uploader.upload_stream((error, result) => {
                if (error) {
                    reject(error);
                }
                resolver(result);
            })
            toStream(file.buffer).pipe(upload);
        });
    }

    // async uploadImage(file: Express.Multer.File): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         const upload = v2.uploader.upload_stream((error, result) => {
    //             if (error) {
    //                 reject(error);
    //             }
    //             resolve(result);
    //         });
    //         file.stream.pipe(upload);
    //     });
    // }

    async deleteImage(publicId: string): Promise<any> {
        return v2.uploader.destroy(publicId, (error, result) => {
            if (error) {
                throw new Error('Failed to delete image');
            }
            return result;
        });
    }
}