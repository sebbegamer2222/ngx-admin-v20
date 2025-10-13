import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { EChartsOption } from "echarts";
import { NgxEchartsModule } from "ngx-echarts";

@Component({
  selector: "ngx-echarts-radar",
  template: ` <div echarts [options]="options" class="echart"></div> `,
  imports: [NgxEchartsModule],
})
export class EchartsRadarComponent implements OnInit, OnDestroy {
  options!: EChartsOption;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {}

  ngOnInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      const echarts: any = config.variables?.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.danger, colors.warning],
        tooltip: {},
        legend: {
          data: ["Allocated Budget", "Actual Spending"],
          textStyle: {
            color: echarts.textColor,
          },
        },
        radar: {
          axisName: {
            color: echarts.textColor,
          },
          axisLabel: {
            formatter: (value: number) => `${value * 100}%`,
            color: echarts.textColor,
          },
          axisTick: { show: false }, // Hide tick lines
          splitNumber: 2,
          indicator: [
            { name: "Sales", max: 6500, axisType: "log" },
            { name: "Administration", max: 16000, axisType: "log" },
            { name: "Information Technology", max: 30000, axisType: "log" },
            { name: "Customer Support", max: 38000, axisType: "log" },
            { name: "Development", max: 52000, axisType: "log" },
            { name: "Marketing", max: 25000, axisType: "log" },
          ],
          splitArea: {
            areaStyle: {
              color: ["transparent"],
            },
          },
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "Allocated Budget",
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "Actual Spending",
              },
            ],
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
