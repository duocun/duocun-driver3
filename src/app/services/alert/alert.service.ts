import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private translator: TranslateService,
    private alert: AlertController
  ) { }

  async showAlert(title: string, message: string, button: string = "OK", callback?: Function) {
    const dict = await this.translator.get([title, message, button]).toPromise();
    let alertParam: any = {};
    alertParam.header = dict[title];
    alertParam.message = dict[message];
    if (callback) {
      alertParam.buttons = [
        {
          text: dict[button],
          handler: callback
        }
      ];
    } else {
      alertParam.buttons = [dict[button]];
    }
    const alert = await this.alert.create(alertParam);
    alert.present();
  }

}
