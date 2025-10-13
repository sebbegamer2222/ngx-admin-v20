import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { OutlineData } from "@app/core/data/visitors-analytics";
import { LayoutService } from "@app/core/utils";
import { NbThemeService } from "@nebular/theme";
import { graphic } from "echarts";
import { NgxEchartsModule } from "ngx-echarts";
import { delay, takeWhile } from "rxjs/operators";

@Component({
  selector: "ngx-visitors-analytics-chart",
  styleUrls: ["./visitors-analytics-chart.component.scss"],
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
export class ECommerceVisitorsAnalyticsChartComponent
  implements OnInit, OnDestroy
{
  private alive = true;

  @Input() chartData!: {
    innerLine: number[];
    outerLine: OutlineData[];
  };

  option: any;
  themeSubscription: any;
  echartsIntance: any;

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
        delay(1),
        takeWhile(() => this.alive)
      )
      .subscribe((config) => {
        const eTheme = config.variables?.visitors;

        this.setOptions(eTheme);
      });
  }

  setOptions(eTheme: any) {
    this.option = {
      grid: {
        left: 40,
        top: 20,
        right: 0,
        bottom: 60,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: {
            color: eTheme?.tooltipLineColor,
            width: eTheme?.tooltipLineWidth,
          },
        },
        textStyle: {
          color: eTheme?.tooltipTextColor,
          fontSize: 20,
          fontWeight: eTheme?.tooltipFontWeight,
        },
        position: "top",
        backgroundColor: eTheme?.tooltipBg,
        borderColor: eTheme?.tooltipBorderColor,
        borderWidth: 1,
        formatter: (params: any) => {
          return Math.round(parseInt(params[0].value, 10));
        },
        extraCssText: eTheme?.tooltipExtraCss,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        offset: 25,
        data: this.chartData.outerLine.map((i) => i.label),
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
            width: "2",
          },
        },
      },
      yAxis: {
        type: "value",
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: eTheme?.axisLineColor,
            width: "1",
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
            width: "1",
          },
        },
      },
      series: [this.getInnerLine(eTheme), this.getOuterLine(eTheme)],
    };
  }

  getOuterLine(eTheme: any) {
    return {
      type: "line",
      smooth: true,
      symbolSize: 20,
      emphasis: {
        opacity: 0,
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
            color: eTheme?.lineGradFrom,
          },
          {
            offset: 1,
            color: eTheme?.lineGradTo,
          },
        ]),
        shadowColor: eTheme?.lineShadow,
        shadowBlur: 6,
        shadowOffsetY: 12,
      },
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: eTheme?.areaGradFrom,
          },
          {
            offset: 1,
            color: eTheme?.areaGradTo,
          },
        ]),
      },
      data: this.chartData.outerLine.map((i) => i.value),
    };
  }

  getInnerLine(eTheme: any) {
    return {
      type: "line",
      smooth: true,
      symbolSize: 20,
      tooltip: {
        show: false,
        extraCssText: "",
      },
      emphasis: {
        opacity: 0,
        itemStyle: {
          opacity: 0,
        },
      },
      lineStyle: {
        width: eTheme?.innerLineWidth,
        type: eTheme?.innerLineStyle,
        color: new graphic.LinearGradient(0, 0, 0, 1),
      },
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: eTheme?.innerAreaGradFrom,
          },
          {
            offset: 1,
            color: eTheme?.innerAreaGradTo,
          },
        ]),
        opacity: 1,
      },
      data: this.chartData.innerLine,
    };
  }

  onChartInit(echarts: any) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
