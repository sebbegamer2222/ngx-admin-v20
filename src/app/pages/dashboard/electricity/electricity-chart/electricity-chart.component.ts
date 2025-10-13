import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ElectricityChart } from "@app/core/data/electricity";
import { LayoutService } from "@app/core/utils";
import { NbThemeService } from "@nebular/theme";
import { EChartsOption, graphic } from "echarts";
import { NgxEchartsModule } from "ngx-echarts";
import { delay, takeWhile } from "rxjs/operators";

@Component({
  selector: "ngx-electricity-chart",
  styleUrls: ["./electricity-chart.component.scss"],
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
export class ElectricityChartComponent implements OnInit, OnDestroy {
  private alive = true;

  @Input() data: ElectricityChart[] = [];

  option!: EChartsOption;
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
        takeWhile(() => this.alive),
        delay(1)
      )
      .subscribe((config) => {
        const eTheme: any = config.variables?.electricity;

        this.option = {
          grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 80,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "line",
              lineStyle: {
                color: eTheme.tooltipLineColor,
                width: eTheme.tooltipLineWidth,
              },
            },
            textStyle: {
              color: eTheme.tooltipTextColor,
              fontSize: 20,
              fontWeight: eTheme.tooltipFontWeight,
            },
            position: "top",
            backgroundColor: eTheme.tooltipBg,
            borderColor: eTheme.tooltipBorderColor,
            borderWidth: 1,
            formatter: "{c0} kWh",
            extraCssText: eTheme.tooltipExtraCss,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            offset: 25,
            data: this.data.map((i) => i.label),
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: eTheme.xAxisTextColor,
              fontSize: 18,
            },
            axisLine: {
              lineStyle: {
                color: eTheme.axisLineColor,
                width: 2,
              },
            },
          },
          yAxis: {
            boundaryGap: [0, "5%"],
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: eTheme.yAxisSplitLine,
                width: 1,
              },
            },
          },
          series: [
            {
              type: "line",
              smooth: true,
              symbolSize: 20,
              emphasis: {
                itemStyle: {
                  color: "#ffffff",
                  borderColor: eTheme.itemBorderColor,
                  borderWidth: 2,
                  opacity: 1,
                },
              },
              lineStyle: {
                width: eTheme.lineWidth,
                type: eTheme.lineStyle,
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: eTheme.lineGradFrom,
                  },
                  {
                    offset: 1,
                    color: eTheme.lineGradTo,
                  },
                ]),
                shadowColor: eTheme.lineShadow,
                shadowBlur: 6,
                shadowOffsetY: 12,
              },
              areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: eTheme.areaGradFrom,
                  },
                  {
                    offset: 1,
                    color: eTheme.areaGradTo,
                  },
                ]),
              },
              data: this.data.map((i) => i.value),
            },

            {
              type: "line",
              smooth: true,
              symbol: "none",
              lineStyle: {
                width: eTheme.lineWidth,
                type: eTheme.lineStyle,
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: eTheme.lineGradFrom,
                  },
                  {
                    offset: 1,
                    color: eTheme.lineGradTo,
                  },
                ]),
                shadowColor: eTheme.shadowLineDarkBg,
                shadowBlur: 14,
                opacity: 1,
              },
              data: this.data.map((i) => i.value),
            },
          ],
        };
      });
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
