export interface ShopOrder {
    id: number;
    supplier: string;
    cost: number;
    orderDate: Date;
    arrivalDate: Date;
    received: boolean;
    products: ShopProductOrder[];
}

export interface ShopProductOrder {
    shopProductId: number;
    shopOrderId: number;
    quantity: number;
    cost: number;
}