import { RolesEnum } from '../enums/roles.enum';

export interface UserInterface {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: RolesEnum;
    isVerified: boolean;
    tokenExpirationDate: string;
}
