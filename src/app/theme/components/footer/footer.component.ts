import { Component } from "@angular/core";
import { NbIconModule } from "@nebular/theme";

@Component({
  selector: "ngx-footer",
  styleUrls: ["./footer.component.scss"],
  imports: [NbIconModule],
  template: `
    <span class="created-by">
      Powered by
      <b>
        <a
          href="https://github.com/NguyenPham1805/ngx-admin-v20"
          target="_blank"
        >
          Trung Nguyen
        </a>
      </b>
      2025
    </span>
    <div class="socials">
      <a
        href="https://github.com/NguyenPham1805"
        target="_blank"
        class="ion ion-social-github"
      >
        <nb-icon icon="github"></nb-icon>
      </a>
      <!-- <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a> -->
    </div>
  `,
})
export class FooterComponent {}
