// tạo fuction upload 

import { HttpStatus, Inject, Injectable } from "@nestjs/common";
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

    async deleteImage(imageUrl: string): Promise<any> {
        const match = imageUrl.match(/\/v\d+\/([^/]+)\./);
        if (match && match[1]) {
            const publicId = match[1];
            return v2.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    throw new Error('Failed to delete image');
                }
                return result;
            });
        } else {
            return {
                result: "Could not extract public ID from the URL",
            }
        }

    }
}