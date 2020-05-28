import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomePage } from "./home.page";

const routes: Routes = [
  {
    path: "tabs",
    component: HomePage,
    children: [
      {
        path: "pickup",
        loadChildren: () =>
          import("../pickup/pickup.module").then((m) => m.PickupPageModule)
      },
      {
        path: "map",
        loadChildren: () =>
          import("../map/map.module").then((m) => m.MapPageModule)
      },
      {
        path: "merchants",
        loadChildren: () =>
          import("../merchant/merchant.module").then(
            (m) => m.MerchantPageModule
          )
      },
      {
        path: "my-account",
        loadChildren: () =>
          import("../my-account/my-account.module").then(
            (m) => m.MyAccountPageModule
          )
      }
    ]
  },
  {
    path: "",
    redirectTo: "tabs/pickup"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
