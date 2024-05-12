export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    locationId: number;
    locationName: string;
}

export interface RegisterUser {
    firstName: string;
    lastName: string;
    email: string;
    locationName: string;
    password:string;
}

export interface LoginDto {
    email: string;
    password:string;
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