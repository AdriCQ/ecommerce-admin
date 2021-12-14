import { AxiosPromise } from 'axios';
import { api } from 'src/boot/axios';
import { IDestination } from './types';

export class ShopService {
    private readonly BASE_PATH = '/destinations';
    /**
     * create
     * @param _p 
     * @returns 
     */
    create(_p: IDestination): AxiosPromise<IDestination> { return api.post(this.BASE_PATH, _p) }
    /**
     * delete
     * @param _id 
     * @returns 
     */
    delete(_id: number): AxiosPromise<unknown> { return api.delete(`${this.BASE_PATH}/${_id}`) }
    /**
     * list
     * @returns 
     */
    list(): AxiosPromise<IDestination[]> { return api.get(this.BASE_PATH) }
    /**
     * 
     * @param _id 
     * @param _p 
     * @returns 
     */
    update(_id: number, _p: IDestination): AxiosPromise<IDestination> {
        return api.put(`${this.BASE_PATH}/${_id}`, _p)
    }

}