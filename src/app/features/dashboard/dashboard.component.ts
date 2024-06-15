import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { ApiDashboardService } from './api.service.dashboard';
import { DashboardDto, ReportRequestDto, ShopSalesDto } from './dashboard-models';

@Component({
  selector: 'app-users',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  dashboardDto!: DashboardDto;
  constructor(private apiDashboardService: ApiDashboardService) { }

  ngOnInit(): void {
    this.apiDashboardService.getDashboardInitialData().subscribe((result: DashboardDto) => {
      this.dashboardDto = result;
    });

    let request: ReportRequestDto = {
      refferenceDate: undefined,
      reportType: undefined
    }
    this.apiDashboardService.shopSales(request).subscribe((result: ShopSalesDto[]) => 
    {
    }); 

    const options = {
      chart: {
        height: "100%",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
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
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: 0
        },
      },
      series: [
        {
          name: "New users",
          data: [6500, 6418, 6456, 6526, 6356, 6456],
          color: "#1A56DB",
        },
      ],
      xaxis: {
        categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    };

    if (document.getElementById("area-chart")) {
      const chart = new ApexCharts(document.getElementById("area-chart"), options);
      chart.render();
    }
  }
}
