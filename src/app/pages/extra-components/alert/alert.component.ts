import { Component } from "@angular/core";
import { NbAlertModule, NbCardModule } from "@nebular/theme";

@Component({
  selector: "ngx-alert",
  templateUrl: "alert.component.html",
  imports: [NbCardModule, NbAlertModule],
})
export class AlertComponent {}
