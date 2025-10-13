import { Component, OnDestroy } from "@angular/core";
import {
  ProgressInfo,
  StatsProgressBarData,
} from "@app/core/data/stats-progress-bar";
import { NumberWithCommasPipe } from "@app/theme/pipes";
import { NbCardModule, NbProgressBarModule } from "@nebular/theme";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "ngx-progress-section",
  styleUrls: ["./progress-section.component.scss"],
  templateUrl: "./progress-section.component.html",
  imports: [NumberWithCommasPipe, NbCardModule, NbProgressBarModule],
})
export class ECommerceProgressSectionComponent implements OnDestroy {
  private alive = true;

  progressInfoData: ProgressInfo[] = [];

  constructor(private statsProgressBarService: StatsProgressBarData) {
    this.statsProgressBarService
      .getProgressInfoData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.progressInfoData = data;
      });
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
