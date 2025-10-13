# ngx-admin — Angular 20 migration (community fork)

> A community-maintained fork of **akveo/ngx-admin** migrated to **Angular 20**.

**Status:** Usable

---

## ⚠️ Important note

This repository is a fork of [akveo/ngx-admin](https://github.com/akveo/ngx-admin).  
It upgrades the demo/starter project to **Angular 20** (CLI, RxJS, Nebular, dependencies). If you need the official upstream, see akveo/ngx-admin.

---

## What changed in this migration

- Upgraded Angular from v16 → v20

- Updated CLI config, TS config, and builder settings

- Updated major dependencies:

  - @angular -> v20
  - @angular/cdk -> v20
  - @asymmetrik/ngx-leaflet -> v18
  - @nebular/auth -> v16
    @nebular/eva-icons -> v16
    @nebular/security -> v16
    @nebular/theme -> v16
  - @swimlane/ngx-charts -> v23
  - bootstrap -> v5
  - core-js -> v3
  - echarts -> v6
  - ionicons -> v8
  - leaflet -> v1.9.4
  - typescript -> v5.9.3

- Fixed breaking changes:

  - Added material themes
  - Migrate all module/component to standalone APIs
  - Changing @core, @theme -> core, theme
  - Added alias import "@app"
  - ~~angular2-chartjs~~ -> remove (The package no longer updates version (actually I'm not know how to fix 🤨))
  - ~~node-sass~~ -> sass v1.93.2
  - ~~ckeditor~~ -> ckeditor5 v5
  - ~~tinymce~~ -> I'll update later

- Known issues:
  - Chart issue `warning`:
    - [ECharts] Can't get DOM width or height. Please check dom.clientWidth and dom.clientHeight. They should not be 0.For example, you may need to call this in the callback of window.onload. (define char in ngAfterViewInit will solve)
    - [ECharts] The ticks may be not readable when set min: 0, max: 6500 and alignTicks: true (specify EchartsRadarComponent chart option)

---

## Quick start

### Prerequisites

- Node.js >= v20.19.5 (or whatever you tested)
- npm >= 9 / pnpm / yarn (state what you used)
- Angular CLI compatible with Angular 20 (optional)

### Install & run

```bash
git clone https://github.com/ngx-admin-v20/ngx-admin-v20.git

cd ngx-admin-v20

git checkout migrate/angular-20

# install
npm install

# serve
npm run start
```
