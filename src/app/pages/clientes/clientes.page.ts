import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  @ViewChild(IonList) ionList: IonList;
  client = [];

  constructor(
    private clienteService: ClienteService,
    private toastCtrl: ToastController,
    public router: Router,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.listar();
  }

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    this.clienteService.list().subscribe((data) => {
      if (data.success) {
        this.client = data.clientes;
      } else {
        this.client = [];
      }
    });
  }

  buscar(event) {
    const valor = event.detail.value;

    this.clienteService.Filter(valor).subscribe((data) => {
      console.log(data);
      if (data) {
        this.client = data['clientes'];
      } else {
        this.client = [];
      }
    });
  }

  async borrarcliente(codigo) {

    const alert = await this.alertController.create({
      header: 'Eliminar Cliente',
      message: '¿Está seguro de querer eliminar el cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          id: 'cancel-button',
        }, {
          text: 'Eliminar',
          id: 'confirm-button',
          handler: () => {


    this.clienteService.delete(codigo).subscribe(async (data) => {
      const message = data['success']
        ? 'Cliente #' + codigo + ' borrado con exito'
        : ' Error al eliminar, el registro esta siendo utilizado';
      const toast = await this.toastCtrl.create({
        message: 'Cliente #' + codigo + ' borrado con exito',
        duration: 2000,
      });
      this.listar();

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




