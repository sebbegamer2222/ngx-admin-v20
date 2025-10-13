import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { NgxEchartsModule } from "ngx-echarts";

@Component({
  selector: "ngx-echarts-pie",
  template: ` <div echarts [options]="options" class="echart"></div> `,
  imports: [NgxEchartsModule],
})
export class EchartsPieComponent implements OnInit, OnDestroy {
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {}

  ngOnInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
      const colors = config.variables!;
      const echarts: any = config.variables?.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [
          colors.warningLight,
          colors.infoLight,
          colors.dangerLight,
          colors.successLight,
          colors.primaryLight,
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["USA", "Germany", "France", "Canada", "Russia"],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: "Countries",
            type: "pie",
            radius: "80%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "Germany" },
              { value: 310, name: "France" },
              { value: 234, name: "Canada" },
              { value: 135, name: "Russia" },
              { value: 1548, name: "USA" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              color: echarts.textColor,
            },
            labelLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
