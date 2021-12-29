import { DataBase } from 'src/types';
/**
 * Iconfig
 */
export interface IConfig {
    name: string;
    currency: 'USD' | 'CUP';
    open: boolean;
    address: string;
    phone: string;
    phone_extra: string;
    email: string;
    description: string;
}
/**
 * Idestination
 */
export interface IDestination extends DataBase {
    name: string;
    price: number;
}
/**
 * Iproduct
 */
export interface IProduct extends DataBase {
    image: string;
    name: string;
    description: string;
    stock: number;
    price: number;
    gallery: string[];
}
/**
 * IOrder
 */
export interface IOrder extends DataBase {
    name: string;
    address: string;
    phone: string;
    email: string;
    total_price: number;
    order_products: IOrderProduct[];
}
/**
 * Iorder product
 */
export interface IOrderProduct {
    shop_order_id: number;
    shop_product_id: number;
    qty: number;
    product: IProduct;
}