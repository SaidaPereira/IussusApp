import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiserviceService {

constructor(private alertController: AlertController) { }
async alertaInformativa( message: string) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message,
    buttons: ['OK']
  });

  await alert.present();

}
}
