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