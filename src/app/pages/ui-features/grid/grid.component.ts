import { Component } from "@angular/core";
import { NbCardModule } from "@nebular/theme";

@Component({
  selector: "ngx-grid",
  styleUrls: ["./grid.component.scss"],
  templateUrl: "./grid.component.html",
  imports: [NbCardModule],
})
export class GridComponent {}
