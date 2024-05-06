import { LocationDto } from "../users/users-models";

export interface Inventory extends LocationDto {
    id?: number;
    shopProductId :number;
    quantity: number;
    description: string;
    minimumLevel: number;
}
