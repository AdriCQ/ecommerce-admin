import { ref, InjectionKey } from 'vue';
import { ShopService } from './service';
import { IConfig, IDestination } from './types';
/**
 * ShopStore
 */
export class ShopStore {
    private _config = ref<IConfig>({
        address: '',
        currency: 'CUP',
        email: '',
        name: '',
        open: false,
        phone: '',
        phone_extra: ''
    })
    private _destinations = ref<IDestination[]>([]);
    private readonly $service = new ShopService();
    /**
     * Gets & Sets config
     */
    get config() { return this._config.value; }
    set config(_c: IConfig) { this._config.value = _c; }
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
     *	Config Actions
     * -----------------------------------------
     */
    /**
     * Gets config
     * @returns  
     */
    async getConfig() {
        try {
            const resp = await this.$service.getConfig();
            this.config = resp.data;
            this.config.open = Boolean(this.config.open);
            return this.config;
        } catch (error) { throw error }
    }
    /**
     * updateConfig
     * @param _c 
     * @returns 
     */
    async updateConfig(_c: IConfig) {
        try {
            const resp = await this.$service.updateConfig(_c);
            this.config = resp.data;
            return this.config;
        } catch (error) { throw error }

    }
    /**
     * -----------------------------------------
     *	Destination Actions
     * -----------------------------------------
     */
    /**
     * Creates action
     * @param _d 
     * @returns action 
     */
    async createDestination(_d: IDestination): Promise<IDestination> {
        try {
            const resp = await this.$service.createDestination(_d);
            this.destinations.push(resp.data);
            return resp.data;
        } catch (error) { throw error; }

    }
    /**
     * Lists shop store
     * @returns list 
     */
    async listDestination(): Promise<IDestination[]> {
        try {
            const resp = await this.$service.listDestination();
            this.destinations = resp.data;
            return this.destinations;
        } catch (error) { throw error; }
    }
    /**
     * Removes action
     * @param _id 
     * @returns action 
     */
    async deleteDestination(_id: number): Promise<unknown> {
        try {
            await this.$service.deleteDestination(_id);
            const index = this.destinations.findIndex(_d => _d.id === _id)
            return this.destinations.splice(index, 1)
        } catch (error) { throw error; }
    }
    /**
     * Creates action
     * @param _d 
     * @returns action 
     */
    async updateDestination(_id: number, _d: IDestination): Promise<IDestination> {
        try {
            const resp = await this.$service.updateDestination(_id, _d);
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