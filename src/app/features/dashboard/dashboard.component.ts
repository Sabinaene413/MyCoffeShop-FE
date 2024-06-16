import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { ApiDashboardService } from './api.service.dashboard';
import {
  DashboardDto,
  ReportRequestDto,
  ShopSalesDto,
  TopSalesDto,
} from './dashboard-models';

@Component({
  selector: 'app-users',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  options: any = {
    chart: {
      height: '100%',
      maxWidth: '100%',
      type: 'area',
      fontFamily: 'Inter, sans-serif',
      dropShadow: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: '#1C64F2',
        gradientToColors: ['#1C64F2'],
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: 'Comenzi Noi',
        data: [],
        color: '#1A56DB',
      },
    ],
    xaxis: {
      categories: [],
      labels: {
        show: false,
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  dashboardDto!: DashboardDto;
  topSalesDto!: TopSalesDto[];

  constructor(private apiDashboardService: ApiDashboardService) {}

  private formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
      'Ianuarie',
      'Februarie',
      'Martie',
      'Aprilie',
      'Mai',
      'Iunie',
      'Iulie',
      'August',
      'Septembrie',
      'Octombrie',
      'Noiembrie',
      'Decembrie',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  ngOnInit(): void {
    this.apiDashboardService
      .getDashboardInitialData()
      .subscribe((result: DashboardDto) => {
        this.dashboardDto = result;
      });

    let request: ReportRequestDto = {
      refferenceDate: undefined,
      reportType: 3,
    };

    this.apiDashboardService
      .shopSales(request)
      .subscribe((result: ShopSalesDto[]) => {
        const saleDates = result.map((item) =>
          this.formatDate(item.saleDate.toString())
        );
        const noOfSales = result.map((item) => item.noOfSales);

        this.options.xaxis.categories = saleDates;
        this.options.series[0].data = noOfSales;
        if (document.getElementById('area-chart')) {
          const chart = new ApexCharts(
            document.getElementById('area-chart'),
            this.options
          );
          chart.render();
        }
      });

    this.apiDashboardService.topSales().subscribe((result: TopSalesDto[]) => {
      this.topSalesDto = result;
    });
  }
}
