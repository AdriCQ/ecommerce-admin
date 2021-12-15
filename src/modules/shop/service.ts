import { AxiosPromise } from 'axios';
import { api } from 'src/boot/axios';
import { IConfig, IDestination } from './types';

export class ShopService {
    private readonly BASE_PATH = '/shop';
    private readonly CONFIGS_PATH = '/configs';
    private readonly DESTINATION_PATH = '/destinations';
    /**
     * -----------------------------------------
     *	Configs
     * -----------------------------------------
     */
    /**
     * Gets config
     * @returns config 
     */
    getConfig(): AxiosPromise<IConfig> { return api.get(this.CONFIGS_PATH); }
    /**
     * Updates config
     * @param _c 
     * @returns config 
     */
    updateConfig(_c: IConfig): AxiosPromise<IConfig> { return api.post(this.CONFIGS_PATH, _c) }
    /**
     * -----------------------------------------
     *	Destinations
     * -----------------------------------------
     */

    /**
     * create
     * @param _p 
     * @returns 
     */
    createDestination(_p: IDestination): AxiosPromise<IDestination> { return api.post(this.DESTINATION_PATH, _p) }
    /**
     * delete
     * @param _id 
     * @returns 
     */
    deleteDestination(_id: number): AxiosPromise<unknown> { return api.delete(`${this.DESTINATION_PATH}/${_id}`) }
    /**
     * list
     * @returns 
     */
    listDestination(): AxiosPromise<IDestination[]> { return api.get(this.DESTINATION_PATH) }
    /**
     * 
     * @param _id 
     * @param _p 
     * @returns 
     */
    updateDestination(_id: number, _p: IDestination): AxiosPromise<IDestination> {
        return api.put(`${this.DESTINATION_PATH}/${_id}`, _p)
    }

}