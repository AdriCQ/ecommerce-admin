import { AxiosPromise } from 'axios';
import { api } from 'src/boot/axios';
import { IAuthResponse, IUserLogin } from './types';
/**
 * User service
 */
export class UserService {
    /**
     * Base path of user service
     */
    private readonly BASE_PATH = '/users';
    /**
     * Logins user service
     * @param _p 
     * @returns login 
     */
    login(_p: IUserLogin): AxiosPromise<IAuthResponse> { return api.post(this.BASE_PATH + '/login', _p) }
}