import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.route";
import { providerCore } from "./core/core.providers";
import { provideTheme } from "./theme/theme.poviders";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    providerCore(),
    provideTheme(),
    provideAnimationsAsync(),
  ],
};
