import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { LayoutService } from "@app/core/utils";
import { NbThemeService } from "@nebular/theme";
import { EChartsOption, graphic } from "echarts";
import { NgxEchartsModule } from "ngx-echarts";
import { delay, takeWhile } from "rxjs/operators";

@Component({
  selector: "ngx-traffic-chart",
  template: `
    <div
      echarts
      [options]="option"
      class="echart"
      (chartInit)="onChartInit($event)"
    ></div>
  `,
  imports: [NgxEchartsModule],
})
export class TrafficChartComponent implements OnInit, OnDestroy {
  private alive = true;

  @Input() points: number[] = [];

  type = "month";
  types = ["week", "month", "year"];
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

  ngOnInit() {
    this.theme
      .getJsTheme()
      .pipe(
        delay(1),
        takeWhile(() => this.alive)
      )
      .subscribe((config) => {
        const trafficTheme: any = config.variables?.traffic;

        this.option = {
          grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.points,
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
                color: trafficTheme.yAxisSplitLine,
                width: 1,
              },
            },
          },
          tooltip: {
            axisPointer: {
              type: "shadow",
            },
            textStyle: {
              color: trafficTheme.tooltipTextColor,
              fontWeight: trafficTheme.tooltipFontWeight,
              fontSize: 16,
            },
            position: "top",
            backgroundColor: trafficTheme.tooltipBg,
            borderColor: trafficTheme.tooltipBorderColor,
            borderWidth: 1,
            formatter: "{c0} MB",
            extraCssText: trafficTheme.tooltipExtraCss,
          },
          series: [
            {
              type: "line",
              symbol: "circle",
              symbolSize: 8,
              sampling: "average",
              silent: true,
              emphasis: {
                itemStyle: {
                  color: trafficTheme.shadowLineDarkBg,
                  borderColor: "rgba(0,0,0,0)",
                  borderWidth: 0,
                },
              },
              lineStyle: {
                width: 2,
                color: trafficTheme.shadowLineDarkBg,
              },
              data: this.points.map((p) => p - 15),
            },
            {
              type: "line",
              symbol: "circle",
              symbolSize: 6,
              sampling: "average",
              emphasis: {
                itemStyle: {
                  color: trafficTheme.itemColor,
                  borderColor: trafficTheme.itemEmphasisBorderColor,
                  borderWidth: 2,
                },
              },
              lineStyle: {
                width: 2,
                color: trafficTheme.lineBg,
                shadowColor: trafficTheme.lineBg,
                shadowBlur: trafficTheme.lineShadowBlur,
              },
              areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: trafficTheme.gradFrom,
                  },
                  {
                    offset: 1,
                    color: trafficTheme.gradTo,
                  },
                ]),
                opacity: 1,
              },
              data: this.points,
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
