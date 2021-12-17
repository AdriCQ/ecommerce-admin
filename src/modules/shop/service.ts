import { AxiosPromise } from 'axios';
import { api } from 'src/boot/axios';
import { IConfig, IDestination, IProduct } from './types';

export class ShopService {
    private readonly BASE_PATH = '/shop';
    private readonly CONFIGS_PATH = '/configs';
    private readonly DESTINATION_PATH = '/destinations';
    private readonly PRODUCT_PATH = '/products';
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

    /**
     * -----------------------------------------
     *	Products
     * -----------------------------------------
     */
    /**
     * Creates product
     * @param _p 
     * @returns product 
     */
    createProduct(_p: IProduct): AxiosPromise<IProduct> { return api.post(this.PRODUCT_PATH, _p); }
    /**
     * Deletes shop service
     * @param _id 
     * @returns delete 
     */
    deleteProduct(_id: number): AxiosPromise<IProduct> { return api.delete(`${this.PRODUCT_PATH}/${_id}`) }
    /**
     * Lists product
     * @returns product 
     */
    listProduct(): AxiosPromise<IProduct[]> { return api.get(this.PRODUCT_PATH) }
    /**
     * Updates product
     * @param _id 
     * @param _p 
     * @returns product 
     */
    updateProduct(_id: number, _p: IProduct): AxiosPromise<IProduct> {
        return api.put(`${this.PRODUCT_PATH}/${_id}`, _p)
    }

}