import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { AccountInterface } from "../../models/account.model";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  account: AccountInterface | undefined;
  account$: BehaviorSubject<AccountInterface>;

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private platform: Platform
  ) {
    this.account = undefined;
    this.account$ = new BehaviorSubject<AccountInterface>(this.account);
    this.platform.ready().then(async () => {
      const token = await this.getToken();
      if (token) {
        await this.login(token);
      } else {
        this.account = null;
        this.account$.next(this.account);
      }
    });
  }

  async login(token: unknown) {
    return new Promise<AccountInterface>((resolve) => {
      this.http
        .get(`${environment.api}/Accounts/current?tokenId=${token}`)
        .subscribe((data: any) => {
          this.account = data;
            if (this.account && this.account.type === "driver") {
              this.storage.set(environment.storageKey.auth, token).then(() => {
                this.account$.next(this.account);
                resolve(data);
              });
            } else {
              this.logout().then(() => {
                this.account$.next(null);
                resolve(null);
              });
            }
        });
    });
  }

  async logout() {
    return this.storage.remove(environment.storageKey.auth).then(() => {
      this.account = null;
      this.account$.next(this.account);
    });
  }

  async getToken() {
    return new Promise((resolve) => {
      this.storage
        .get(environment.storageKey.auth)
        .then((token) => {
          resolve(token);
        })
        .catch(() => {
          resolve("");
        });
    });
  }
}
