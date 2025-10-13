import { Component } from "@angular/core";
import { NbCardModule, NbSpinnerModule } from "@nebular/theme";

@Component({
  selector: "ngx-spinner-color",
  templateUrl: "spinner-color.component.html",
  imports: [NbCardModule, NbSpinnerModule],
})
export class SpinnerColorComponent {}
