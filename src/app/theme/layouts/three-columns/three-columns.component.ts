import { Component } from "@angular/core";
import { FooterComponent, HeaderComponent } from "@app/theme/components";
import { NbLayoutModule, NbSidebarModule } from "@nebular/theme";

@Component({
  selector: "ngx-three-columns",
  styleUrls: ["./three-columns.component.scss"],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column class="small"> </nb-layout-column>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-column class="small"> </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
  imports: [HeaderComponent, FooterComponent, NbLayoutModule, NbSidebarModule],
})
export class ThreeColumnsLayoutComponent {}
