import { Component, Input, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { takeWhile } from "rxjs/operators";

import { ProfitChart } from "@app/core/data/profit-chart";
import { LayoutService } from "@app/core/utils/layout.service";
import { EChartsOption, graphic } from "echarts";
import { NgxEchartsModule } from "ngx-echarts";

@Component({
  selector: "ngx-profit-chart",
  styleUrls: ["./charts-common.component.scss"],
  template: `
    <div
      echarts
      [options]="options"
      class="echart"
      (chartInit)="onChartInit($event)"
    ></div>
  `,
  imports: [NgxEchartsModule],
})
export class ProfitChartComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  profitChartData!: ProfitChart;

  private alive = true;

  echartsIntance: any;
  options!: EChartsOption;

  constructor(
    private theme: NbThemeService,
    private layoutService: LayoutService
  ) {
    this.layoutService
      .onSafeChangeLayoutSize()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.resizeChart());
  }

  ngOnChanges(): void {
    if (this.echartsIntance) {
      this.updateProfitChartOptions(this.profitChartData);
    }
  }

  ngOnInit() {
    this.theme
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((config) => {
        const eTheme: any = config.variables?.profit;

        this.setOptions(eTheme);
      });
  }

  setOptions(eTheme: any) {
    this.options = {
      backgroundColor: eTheme?.bg,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          shadowStyle: {
            color: "rgba(0, 0, 0, 0.3)",
          },
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: this.profitChartData.chartLabel,
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: eTheme?.axisLineColor,
            },
          },
          axisLabel: {
            color: eTheme?.axisTextColor,
            fontSize: eTheme?.axisFontSize,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: eTheme?.axisLineColor,
            },
          },
          splitLine: {
            lineStyle: {
              color: eTheme?.splitLineColor,
            },
          },
          axisLabel: {
            color: eTheme?.axisTextColor,
            fontSize: eTheme?.axisFontSize,
          },
        },
      ],
      series: [
        {
          name: "Canceled",
          type: "bar",
          barGap: 0,
          barWidth: "20%",
          itemStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: eTheme?.firstLineGradFrom,
              },
              {
                offset: 1,
                color: eTheme?.firstLineGradTo,
              },
            ]),
          },
          data: this.profitChartData.data[0],
        },
        {
          name: "Payment",
          type: "bar",
          barWidth: "20%",
          itemStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: eTheme?.secondLineGradFrom,
              },
              {
                offset: 1,
                color: eTheme?.secondLineGradTo,
              },
            ]),
          },
          data: this.profitChartData.data[1],
        },
        {
          name: "All orders",
          type: "bar",
          barWidth: "20%",
          itemStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: eTheme?.thirdLineGradFrom,
              },
              {
                offset: 1,
                color: eTheme?.thirdLineGradTo,
              },
            ]),
          },
          data: this.profitChartData.data[2],
        },
      ],
    };
  }

  updateProfitChartOptions(profitChartData: ProfitChart) {
    const options = this.options;
    const series = this.getNewSeries(
      options.series as any[],
      profitChartData.data
    );

    this.echartsIntance.setOption({
      series: series,
      xAxis: {
        data: this.profitChartData.chartLabel,
      },
    });
  }

  getNewSeries(series: any[], data: number[][]) {
    return series.map((line, index) => {
      return {
        ...line,
        data: data[index],
      };
    });
  }

  onChartInit(echarts: any) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      // Fix recalculation chart size
      // TODO: investigate more deeply
      setTimeout(() => {
        this.echartsIntance.resize();
      }, 0);
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
