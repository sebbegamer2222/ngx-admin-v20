import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { OneColumnLayoutComponent } from "@app/theme/layouts";
import { NB_WINDOW, NbMenuModule } from "@nebular/theme";
import { MENU_ITEMS } from "./pages-menu";

@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <ngx-one-column>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column>
  `,
  imports: [OneColumnLayoutComponent, NbMenuModule, RouterOutlet],
  providers: [{ provide: NB_WINDOW, useValue: window }],
})
export class PagesComponent {
  menu = MENU_ITEMS;
}
