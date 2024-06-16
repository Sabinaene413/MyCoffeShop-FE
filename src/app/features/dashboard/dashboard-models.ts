export interface DashboardFakeDto {
  id?: number;
}

export interface DashboardDto {
  budget: number;
  noOfSales: number;
  noOfSalesCurrentMonth: number;
  noOfSalesLastMonth: number;
  increasePercentageCurrentMonthSales: number;
  noOfSelledItems: number;
  noOfSelledItemsCurrentMonth: number;
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


export interface ProfitSixMonthsRequestDto {
  refferenceDate? :Date;
}

export interface ProfitSixMonthsDto {
  profit: number;
  profitRate: number;
  income: number;
  expenses: number;
  profitGraphDtos: ProfitGraphDto[];
}

export interface ProfitGraphDto {
  date: Date;
  income: number;
  expenses: number;
}

export interface TopSalesDto {
  productName :string;
  totalSales: number;
}