import { Routes } from "@angular/router";
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from "@nebular/auth";

export const appRoutes: Routes = [
  {
    path: "pages",
    loadChildren: () => import("./pages/pages.route").then((m) => m.pageRoutes),
  },
  {
    path: "auth",
    component: NbAuthComponent,
    children: [
      {
        path: "",
        component: NbLoginComponent,
      },
      {
        path: "login",
        component: NbLoginComponent,
      },
      {
        path: "register",
        component: NbRegisterComponent,
      },
      {
        path: "logout",
        component: NbLogoutComponent,
      },
      {
        path: "request-password",
        component: NbRequestPasswordComponent,
      },
      {
        path: "reset-password",
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: "", redirectTo: "pages", pathMatch: "full" },
  { path: "**", redirectTo: "pages" },
];
