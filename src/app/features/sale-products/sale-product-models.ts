import { LocationDto } from "../users/users-models";

export interface SaleProduct extends LocationDto{
    id?: number;
    name: string;
    price: number;
    description: string;
}

