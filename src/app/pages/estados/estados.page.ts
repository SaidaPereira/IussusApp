import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ToastController, AlertController } from '@ionic/angular';
import { EstadoService } from 'src/services/estado.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.page.html',
  styleUrls: ['./estados.page.scss'],
})
export class EstadosPage implements OnInit {
  @ViewChild(IonList) ionList: IonList;
  estad = [];

  constructor(
    private estadoService: EstadoService,
    private toastCtrl: ToastController,
    public router: Router,
    public alertController: AlertController
 
   
  ) {}

  ngOnInit() {
    this.listarEstado();
  }

  ionViewWillEnter() {
    this.listarEstado();
  }

  listarEstado() {
    this.estadoService.listEstados().subscribe((data) => {
      if (data.success) {
        this.estad = data.estados;
      } else {
        this.estad = [];
      }
    });
  }

  buscar(event) {
    const valor = event.detail.value;

    this.estadoService.Filter(valor).subscribe((data) => {
      console.log(data);
      if (data) {
        this.estad = data['estados'];
      } else {
        this.estad = [];
      }
    });
  }

  async borrarEstado(codigo) {
    const alert = await this.alertController.create({
      header: 'Eliminar Estado',
      message: '¿Está seguro de querer eliminar el estado?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          id: 'cancel-button',
        }, {
          text: 'Eliminar',
          id: 'confirm-button',
          handler: () => {

    this.estadoService.delete(codigo).subscribe(async (data) => {
      const message = data['success']
        ? 'Estado #' + codigo + ' borrado con exito'
        : ' Error al eliminar';
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
      });
      this.listarEstado();

      toast.present();

      this.ionList.closeSlidingItems();
    });
  }
        }
  ]
});

await alert.present();
    
  }

}
