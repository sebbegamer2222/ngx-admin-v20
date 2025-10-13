import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { delay, takeWhile } from "rxjs/operators";

import { OrdersChart } from "@app/core/data/orders-chart";
import { LayoutService } from "@app/core/utils/layout.service";
import { EChartsOption, graphic, LineSeriesOption } from "echarts";
import { NgxEchartsModule } from "ngx-echarts";

@Component({
  selector: "ngx-orders-chart",
  styleUrls: ["./charts-common.component.scss"],
  template: `
    <div
      echarts
      [options]="option"
      [merge]="option"
      class="echart"
      (chartInit)="onChartInit($event)"
    ></div>
  `,
  imports: [NgxEchartsModule],
})
export class OrdersChartComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  ordersChartData!: OrdersChart;

  private alive = true;

  echartsIntance: any;
  option!: EChartsOption;

  ngOnChanges(change: SimpleChanges): void {
    if (
      this.option &&
      change.ordersChartData &&
      !change.ordersChartData.isFirstChange()
    ) {
      this.updateOrdersChartOptions(this.ordersChartData);
    }
  }

  constructor(
    private theme: NbThemeService,
    private layoutService: LayoutService
  ) {
    this.layoutService
      .onSafeChangeLayoutSize()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.resizeChart());
  }

  ngOnInit(): void {
    this.theme
      .getJsTheme()
      .pipe(
        takeWhile(() => this.alive),
        delay(1)
      )
      .subscribe((config) => {
        const eTheme: any = config.variables?.orders;

        this.setOptions(eTheme);
        this.updateOrdersChartOptions(this.ordersChartData);
      });
  }

  setOptions(eTheme: any) {
    this.option = {
      grid: {
        left: 40,
        top: 20,
        right: 0,
        bottom: 40,
      },
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "line",
          lineStyle: {
            color: eTheme?.tooltipLineColor,
            width: eTheme?.tooltipLineWidth,
          },
        },
        textStyle: {
          color: eTheme?.tooltipTextColor,
          fontSize: eTheme?.tooltipFontSize,
          fontWeight: eTheme?.tooltipFontWeight,
        },
        position: "top",
        backgroundColor: eTheme?.tooltipBg,
        borderColor: eTheme?.tooltipBorderColor,
        borderWidth: 1,
        formatter: (params: any) => {
          return `$ ${Math.round(parseInt(params.value, 10))}`;
        },
        extraCssText: eTheme?.tooltipExtraCss,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        offset: 5,
        data: [],
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: eTheme?.axisTextColor,
          fontSize: eTheme?.axisFontSize,
        },
        axisLine: {
          lineStyle: {
            color: eTheme?.axisLineColor,
            width: 2,
          },
        },
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "5%"],
        axisLine: {
          lineStyle: {
            color: eTheme?.axisLineColor,
            width: 1,
          },
        },
        axisLabel: {
          color: eTheme?.axisTextColor,
          fontSize: eTheme?.axisFontSize,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: eTheme?.yAxisSplitLine,
            width: 1,
          },
        },
      },
      series: [
        this.getFirstLine(eTheme),
        this.getSecondLine(eTheme),
        this.getThirdLine(eTheme),
      ],
    };
  }

  getFirstLine(eTheme: any): LineSeriesOption {
    return {
      type: "line",
      smooth: true,
      symbolSize: 20,
      itemStyle: {
        opacity: 0,
      },
      lineStyle: {
        width: 0,
      },
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: eTheme?.firstAreaGradFrom,
          },
          {
            offset: 1,
            color: eTheme?.firstAreaGradTo,
          },
        ]),
        opacity: 1,
      },
      data: [],
    };
  }

  getSecondLine(eTheme: any): LineSeriesOption {
    return {
      type: "line",
      smooth: true,
      symbolSize: 20,
      itemStyle: {
        opacity: 0,
      },
      emphasis: {
        itemStyle: {
          color: "#ffffff",
          borderColor: eTheme?.itemBorderColor,
          borderWidth: 2,
          opacity: 1,
        },
      },
      lineStyle: {
        width: eTheme?.lineWidth,
        type: eTheme?.lineStyle,
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
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: eTheme?.secondAreaGradFrom,
          },
          {
            offset: 1,
            color: eTheme?.secondAreaGradTo,
          },
        ]),
      },
      data: [],
    };
  }

  getThirdLine(eTheme: any): LineSeriesOption {
    return {
      type: "line",
      smooth: true,
      symbolSize: 20,
      itemStyle: {
        opacity: 0,
      },
      emphasis: {
        itemStyle: {
          color: "#ffffff",
          borderColor: eTheme?.itemBorderColor,
          borderWidth: 2,
          opacity: 1,
        },
      },
      lineStyle: {
        width: eTheme?.lineWidth,
        type: eTheme?.lineStyle,
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
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: eTheme?.thirdAreaGradFrom },
          { offset: 1, color: eTheme?.thirdAreaGradTo },
        ]),
      },
      data: [],
    };
  }

  updateOrdersChartOptions(ordersChartData: OrdersChart) {
    const options = this.option;
    const series = this.getNewSeries(
      options.series as LineSeriesOption[],
      ordersChartData.linesData
    );
    const xAxis = this.getNewXAxis(options.xAxis, ordersChartData.chartLabel);

    this.option = {
      ...options,
      xAxis,
      series,
    };
  }

  getNewSeries(
    series: LineSeriesOption[],
    linesData: number[][]
  ): LineSeriesOption[] {
    return series.map((line, index) => {
      return {
        ...line,
        data: linesData[index],
      };
    });
  }

  getNewXAxis(xAxis: any, chartLabel: string[]) {
    return {
      ...xAxis,
      data: chartLabel,
    };
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

  ngOnDestroy() {
    this.alive = false;
  }
}
