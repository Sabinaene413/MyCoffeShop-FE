import { LocationDto } from "../users/users-models";

export interface ShopProduct extends LocationDto{
    id?: number;
    name: string;
    price: number;
    description: string;
}

