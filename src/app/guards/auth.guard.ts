import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { filter } from "rxjs/operators";
import { AuthService } from "../services/auth/auth.service";
import { AccountInterface } from "../models/account.model";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.account$
        .pipe(filter((account) => account !== undefined))
        .subscribe((account: AccountInterface) => {
          if (account) {
            resolve(true);
          } else {
            this.router.navigate(["/tabs/login"], {
              queryParams: { redirectUrl: state.url }
            });
            resolve(false);
          }
        });
    });
  }
}
