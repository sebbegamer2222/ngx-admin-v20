import { Component } from "@angular/core";
import { NbCardModule, NbSelectModule } from "@nebular/theme";

@Component({
  selector: "ngx-nebular-select",
  templateUrl: "nebular-select.component.html",
  styleUrls: ["nebular-select.component.scss"],
  imports: [NbCardModule, NbSelectModule],
})
export class NebularSelectComponent {
  commonSelectedItem = "2";
  selectedItem: string | null = null;
}
