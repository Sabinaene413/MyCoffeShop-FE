import { LocationDto } from "../users/users-models";

export interface ShopOrder extends LocationDto{
    id: number;
    supplier: string;
    cost: number;
    orderDate: Date;
    arrivalDate: Date;
    received: boolean;
    shopOrderProducts: ShopProductOrder[];
}

export interface ShopProductOrder {
    id?:number;
    shopProductId: number;
    shopOrderId?: number;
    quantity: number;
    cost: number;
    price: number;
}