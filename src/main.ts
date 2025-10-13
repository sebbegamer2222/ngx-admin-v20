/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { enableProdMode } from "@angular/core";

import { bootstrapApplication } from "@angular/platform-browser";
import { defineCustomElements } from "ionicons/loader";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

defineCustomElements(window);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
