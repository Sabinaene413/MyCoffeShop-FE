export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    locationId: number;
    locationName: string;
}

export interface Person {
    id: number;
    firstName: string;
    lastName: string;
}

export interface LocationDto {
    locationId? :number;
    locationName? :string;
}