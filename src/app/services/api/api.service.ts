import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import * as queryString from "query-string";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  apiHost: string;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.apiHost = environment.api;
  }

  buildUrl(url, param = null) {
    url = this.apiHost + (url.startsWith("/") ? url : `/${url}`);
    if (!param) {
      return url;
    }
    if (typeof param === "string") {
      return url + param;
    }
    if (typeof param === "object") {
      return `${url}?${queryString.stringify(param)}`;
    }
    return url;
  }

  async buildAuthHeader() {
    const token = await this.auth.getToken();
    if (token) {
      return {
        headers: new HttpHeaders().set("Authorization", `Bearer ${token}`)
      };
    } else {
      return {};
    }
  }

  async get(url, param = null, auth = true, isRelative = true) {
    if (isRelative) {
      url = this.buildUrl(url, param);
    }
    if (auth) {
      const authHeader = await this.buildAuthHeader();
      return this.http.get(url, authHeader).toPromise();
    } else {
      return this.http.get(url).toPromise();
    }
  }

  async geth(url, param = null, auth = true, key = "data"): Promise<any> {
    url = this.buildUrl(url);
    let headers: any;
    if (auth) {
      const authHeader = await this.buildAuthHeader();
      headers = authHeader.headers ? authHeader.headers : new HttpHeaders();
    } else {
      headers = new HttpHeaders();
    }
    headers = headers.append(key, JSON.stringify(param));
    return new Promise((resolve, reject) => {
      this.http
        .get(url, { headers })
        .toPromise()
        .then((resp: any) => {
          resolve(resp);
        });
    });
  }

  async post(url, param = null, auth = true, isRelative = true) {
    if (isRelative) {
      url = this.buildUrl(url);
    }
    if (auth) {
      const authHeader = await this.buildAuthHeader();
      return this.http.post(url, param, authHeader).toPromise();
    } else {
      return this.http.post(url, param).toPromise();
    }
  }

  async put(url, param = null, auth = true, isRelative = true) {
    if (isRelative) {
      url = this.buildUrl(url);
    }
    if (auth) {
      const authHeader = await this.buildAuthHeader();
      return this.http.put(url, param, authHeader).toPromise();
    } else {
      return this.http.put(url, param).toPromise();
    }
  }

  async patch(url, param = null, auth = true, isRelative = true) {
    if (isRelative) {
      url = this.buildUrl(url);
    }
    if (auth) {
      const authHeader = await this.buildAuthHeader();
      return this.http.patch(url, param, authHeader).toPromise();
    } else {
      return this.http.patch(url, param).toPromise();
    }
  }

  async delete(url, param = null, auth = true, isRelative = true) {
    if (isRelative) {
      url = this.buildUrl(url, param);
    }
    if (auth) {
      const authHeader = await this.buildAuthHeader();
      return this.http.delete(url, authHeader).toPromise();
    } else {
      return this.http.delete(url).toPromise();
    }
  }
}
