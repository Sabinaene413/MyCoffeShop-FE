import { Component, OnInit } from '@angular/core';
import { ApiDashboardService } from '../api.service.dashboard';
import {
  ProfitSixMonthsDto,
  ProfitSixMonthsRequestDto,
} from '../dashboard-models';
@Component({
  selector: 'app-profit-graph',
  templateUrl: './profit-graph.component.html',
})
export class ProfitGraphComponent implements OnInit {
  constructor(private apiDashboardService: ApiDashboardService) {}

  ngOnInit(): void {
    this.initializeBarChart();
  }

  profitDto!: ProfitSixMonthsDto;
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
    return `${month} ${year}`;
  };
  private options = {
    series: [
      {
        name: 'Income',
        color: '#31C48D',
        data: [1],
      },
      {
        name: 'Expense',
        data: [1],
        color: '#F05252',
      },
    ],
    chart: {
      sparkline: {
        enabled: false,
      },
      type: 'bar',
      width: '100%',
      height: 400,
      toolbar: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '100%',
        borderRadiusApplication: 'end',
        borderRadius: 6,
        dataLabels: {
          position: 'top',
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom',
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      formatter: function (value: any) {
        return 'LEI' + value;
      },
    },
    xaxis: {
      labels: {
        show: false,
        style: {
          fontFamily: 'Inter, sans-serif',
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
        },
        formatter: function (value: any) {
          return 'LEI' + value;
        },
      },
      categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: 'Inter, sans-serif',
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
        },
      },
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -20,
      },
    },
  };
  initializeBarChart(): void {
    let request: ProfitSixMonthsRequestDto = {
      refferenceDate: undefined,
    };

    this.apiDashboardService
      .profitSixMonths(request)
      .subscribe((result: ProfitSixMonthsDto) => {
        this.profitDto = result;

        const dates = result.profitGraphDtos.map((item) =>
          this.formatDate(item.date.toString())
        );

        const incomes = result.profitGraphDtos.map((item) => item.income);
        const expenses = result.profitGraphDtos.map((item) => item.expenses);

        this.options.xaxis.categories = dates;
        this.options.series[0] = {
          name: 'Venituri',
          data: incomes,
          color: '#31C48D',
        };
        this.options.series[1] = {
          name: 'Cheltuieli',
          data: expenses,
          color: '#F05252',
        };

        if (
          document.getElementById('bar-chart') &&
          typeof ApexCharts !== 'undefined'
        ) {
          const chart = new ApexCharts(
            document.getElementById('bar-chart'),
            this.options
          );
          chart.render();
        }
      });
  }
}
