import { LocationDto } from '../users/users-models';

export interface Transaction extends LocationDto {
  id?: number;
  description: string;
  employeePaymentId?: number;
  shopOrderId?: number;
  saleOrderId?: number;
  totalAmount: number;
  transactionTypeId: number;
  transactionDate: Date;
}

export interface TransactionDetail extends LocationDto {
    id?: number;
    shopProductId?: number;
    saleProductId?: number;
    amount: number;
    quantity: number;
  }
  
  
  