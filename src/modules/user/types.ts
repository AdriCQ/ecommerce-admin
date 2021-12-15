import { DataBase } from 'src/types';
/**
 * Iuser profile
 */
export interface IUserProfile extends DataBase {
    name: string;
    email: string;
    phone?: string;
}
/**
 * Iuser login
 */
export interface IUserLogin {
    email: string;
    password: string;
}
/**
 * Iauth response
 */
export interface IAuthResponse {
    profile: IUserProfile;
    api_token: string;
}