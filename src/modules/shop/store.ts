import { ref, InjectionKey } from 'vue';
import { ShopService } from './service';
import { IDestination } from './types';
/**
 * ShopStore
 */
export class ShopStore {
    private _destinations = ref<IDestination[]>([]);
    private readonly $service = new ShopService();

    /**
     * Gets destinations
     */
    get destinations() { return this._destinations.value }
    /**
     * Sets destinations
     */
    set destinations(_d: IDestination[]) { this._destinations.value = _d }
    /**
     * -----------------------------------------
     *	Actions
     * -----------------------------------------
     */
    /**
     * Creates action
     * @param _d 
     * @returns action 
     */
    async createAction(_d: IDestination): Promise<IDestination> {
        try {
            const resp = await this.$service.create(_d);
            this.destinations.push(resp.data);
            return resp.data;
        } catch (error) { throw error; }

    }
    /**
     * Lists shop store
     * @returns list 
     */
    async listAction(): Promise<IDestination[]> {
        try {
            const resp = await this.$service.list();
            this.destinations = resp.data;
            return this.destinations;
        } catch (error) { throw error; }
    }
    /**
     * Removes action
     * @param _id 
     * @returns action 
     */
    async removeAction(_id: number): Promise<unknown> {
        try {
            await this.$service.delete(_id);
            const index = this.destinations.findIndex(_d => _d.id === _id)
            return this.destinations.splice(index, 1)
        } catch (error) { throw error; }
    }
    /**
     * Creates action
     * @param _d 
     * @returns action 
     */
    async updateAction(_id: number, _d: IDestination): Promise<IDestination> {
        try {
            const resp = await this.$service.update(_id, _d);
            const index = this.destinations.findIndex(_d => _d.id === _id)
            this.destinations[index] = resp.data;
            return resp.data;
        } catch (error) { throw error; }
    }

}


/**
 * ShopStore instance
 */
export const shopStore = new ShopStore();
/**
 * ShopStore Inject Key
 */
export const shopInjectionKey: InjectionKey<ShopStore> = Symbol('ShopStore');