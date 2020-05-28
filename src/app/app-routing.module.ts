import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule)
  },
  {
    path: "pickup",
    loadChildren: () =>
      import("./pages/pickup/pickup.module").then((m) => m.PickupPageModule)
  },
  {
    path: "map",
    loadChildren: () =>
      import("./pages/map/map.module").then((m) => m.MapPageModule)
  },
  {
    path: "my-account",
    loadChildren: () =>
      import("./pages/my-account/my-account.module").then(
        (m) => m.MyAccountPageModule
      )
  },
  {
    path: "merchant",
    loadChildren: () =>
      import("./pages/merchant/merchant.module").then(
        (m) => m.MerchantPageModule
      )
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
