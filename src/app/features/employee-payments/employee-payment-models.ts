import { LocationDto } from "../users/users-models";

export interface EmployeePayment extends LocationDto{
    id?: number;
    employeeId:number;
    amount: number;
    employeePaymentDate: Date;
}

