import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesHelperService {
    checkRole(user, role: string): boolean {
        if (user.loai_nguoi_dung === role) return true;
        return false;
    }
}
