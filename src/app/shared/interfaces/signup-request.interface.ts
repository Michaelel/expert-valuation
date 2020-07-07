import { RolesEnum } from '../enums/roles.enum';

export interface SignupRequestInterface {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: RolesEnum;
}
