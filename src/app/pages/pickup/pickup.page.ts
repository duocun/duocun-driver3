import { Component, OnInit, OnDestroy } from "@angular/core";
import { MerchantInterface } from 'src/app/models/merchant.model';
import { OrderInterface } from 'src/app/models/order.model';
import { AccountInterface } from 'src/app/models/account.model';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as moment from "moment";
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: "app-pickup",
  templateUrl: "./pickup.page.html",
  styleUrls: ["./pickup.page.scss"]
})
export class PickupPage implements OnInit, OnDestroy {

  restaurants: Array<MerchantInterface>;
  orders: Array<OrderInterface>;
  account: AccountInterface;
  unsubscribe$: Subject<void>;

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) {
    this.restaurants = [];
    this.orders = [];
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async ngOnInit() {
    this.auth.account$.pipe(
      filter(account => account !== undefined),
      takeUntil(this.unsubscribe$)
    ).subscribe(account => {
      this.account = account;
    });
    this.restaurants = <Array<MerchantInterface>> await this.api.geth("Restaurants/qFind", {
      status: "A",
      type: {
        $in: ["R", "G"]
      }
    });
    this.orders = (await this.api.geth("Pickups", {
      driverId: this.account._id,
      delivered: moment().format("YYYY-MM-DD") + "T15:00:00.000Z"
    })).data;
  }
}