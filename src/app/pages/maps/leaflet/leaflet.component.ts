import { Component } from "@angular/core";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { NbCardModule } from "@nebular/theme";

import * as L from "leaflet";

@Component({
  selector: "ngx-leaflet",
  styleUrls: ["./leaflet.component.scss"],
  template: `
    <nb-card>
      <nb-card-header>Leaflet Maps</nb-card-header>
      <nb-card-body>
        <div leaflet [leafletOptions]="options"></div>
      </nb-card-body>
    </nb-card>
  `,
  imports: [NbCardModule, LeafletModule],
})
export class LeafletComponent {
  options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "...",
      }),
    ],
    zoom: 5,
    center: L.latLng({ lat: 38.991709, lng: -76.886109 }),
  };
}
