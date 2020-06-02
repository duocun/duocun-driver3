import { Component, OnInit } from "@angular/core";
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {

  username: string;
  password: string;
  redirectUrl: string;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = "";
    this.password = "";
    this.redirectUrl = this.route.snapshot.queryParams["redirectUrl"] || "/";
  }

  async handleLogin() {

    const token = await this.api.post("Accounts/login", {
      username: this.username,
      password: this.password
    });

    if (!token) {
      await this.alert.showAlert("Notice", "Login failed");
      return;
    }

    const account = await this.auth.login(token);

    if (!account) {
      await this.alert.showAlert("Notice", "Login failed");
      return;
    }

    this.router.navigate([this.redirectUrl]);

  }

}
