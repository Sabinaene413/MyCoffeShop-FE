export interface DashboardFakeDto {
  id?: number;
}

export interface DashboardDto {
  budget: number;
  noOfSales: number;
  noOfSalesCurrentMonth: number;
}

export interface ShopSalesDto {
  saleDate: Date;
  cost: number;
  noOfSales: number;
  noOfItemsSold: number;
  details: string;
}

export interface ReportRequestDto {
  refferenceDate?: Date;
  reportType?: number;
}
