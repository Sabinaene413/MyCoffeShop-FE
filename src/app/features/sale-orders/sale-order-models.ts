import { LocationDto } from "../users/users-models";

export interface SaleOrder extends LocationDto {
    id: number;
    cost: number;
    orderDate: Date;
    products: SaleProductOrder[];
}

export interface SaleProductOrder {
    SaleProductId: number;
    SaleOrderId: number;
    quantity: number;
    cost: number;
}