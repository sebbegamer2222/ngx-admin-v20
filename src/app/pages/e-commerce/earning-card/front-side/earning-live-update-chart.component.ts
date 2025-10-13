import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { LayoutService } from "@app/core/utils/layout.service";
import { NbThemeService } from "@nebular/theme";
import { graphic } from "echarts/core";
import { EChartsOption } from "echarts/types/dist/shared";
import { NgxEchartsModule } from "ngx-echarts";
import { delay, takeWhile } from "rxjs/operators";

@Component({
  selector: "ngx-earning-live-update-chart",
  styleUrls: ["earning-card-front.component.scss"],
  template: `
    <div
      echarts
      class="echart"
      [options]="option"
      (chartInit)="onChartInit($event)"
    ></div>
  `,
  imports: [NgxEchartsModule],
})
export class EarningLiveUpdateChartComponent
  implements OnInit, OnDestroy, OnChanges
{
  private alive = true;

  @Input() liveUpdateChartData: { value: [string, number] }[] = [];

  option!: EChartsOption;
  echartsInstance!: any;

  constructor(
    private theme: NbThemeService,
    private layoutService: LayoutService
  ) {
    this.layoutService
      .onSafeChangeLayoutSize()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.resizeChart());
  }

  ngOnChanges(change: SimpleChanges): void {
    if (
      this.echartsInstance &&
      change.liveUpdateChartData &&
      !change.liveUpdateChartData.isFirstChange()
    ) {
      this.updateChartOptions(this.liveUpdateChartData);
    }
  }

  ngOnInit() {
    this.theme
      .getJsTheme()
      .pipe(
        delay(1),
        takeWhile(() => this.alive)
      )
      .subscribe((config) => {
        const earningLineTheme: any = config.variables?.earningLine;
        this.setChartOption(earningLineTheme);
      });
  }

  setChartOption(earningLineTheme: any) {
    this.option = {
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      xAxis: {
        type: "time",
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
          show: false,
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
          show: false,
        },
      },
      tooltip: {
        axisPointer: {
          type: "shadow",
        },
        textStyle: {
          color: earningLineTheme?.tooltipTextColor,
          fontWeight: earningLineTheme?.tooltipFontWeight,
          fontSize: earningLineTheme?.tooltipFontSize,
        },
        position: "top",
        backgroundColor: earningLineTheme?.tooltipBg,
        borderColor: earningLineTheme?.tooltipBorderColor,
        borderWidth: earningLineTheme?.tooltipBorderWidth,
        formatter: (params: any) =>
          `$ ${Math.round(parseInt(params.value[1], 10))}`,
        extraCssText: earningLineTheme?.tooltipExtraCss,
      },
      series: [
        {
          type: "line",
          symbol: "circle",
          sampling: "average",
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
                color: earningLineTheme?.gradFrom,
              },
              {
                offset: 1,
                color: earningLineTheme?.gradTo,
              },
            ]),
            opacity: 1,
          },
          data: this.liveUpdateChartData,
        },
      ],
      animation: true,
    };
  }

  updateChartOptions(chartData: { value: [string, number] }[]) {
    this.echartsInstance.setOption({
      series: [
        {
          data: chartData,
        },
      ],
    });
  }

  onChartInit(ec: any) {
    this.echartsInstance = ec;
  }

  resizeChart() {
    if (this.echartsInstance) {
      this.echartsInstance.resize();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
