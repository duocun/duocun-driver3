import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomePage } from "./home.page";
import { AuthGuard } from "src/app/guards/auth.guard";

const routes: Routes = [
  {
    path: "tabs",
    component: HomePage,
    children: [
      {
        path: "pickup",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../pickup/pickup.module").then((m) => m.PickupPageModule)
      },
      {
        path: "map",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../map/map.module").then((m) => m.MapPageModule)
      },
      {
        path: "merchants",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../merchant/merchant.module").then(
            (m) => m.MerchantPageModule
          )
      },
      {
        path: "my-account",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../my-account/my-account.module").then(
            (m) => m.MyAccountPageModule
          )
      },
      {
        path: "login",
        loadChildren: () =>
          import("../login/login.module").then((m) => m.LoginPageModule)
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
