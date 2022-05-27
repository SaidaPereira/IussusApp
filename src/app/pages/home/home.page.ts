import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionSheetController,
  IonList,
  ToastController,
  AlertController,
} from '@ionic/angular';
import { PedidoPage } from '../pedido/pedido.page';
import { PedidoService } from '../../../services/pedido.service';
import { EstadoService } from '../../../services/estado.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonList) ionList: IonList;
  public home: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private estadoService: EstadoService,
    private pedidoService: PedidoService,
    public actionSheetController: ActionSheetController,
    private toastCtrl: ToastController,
    private alertController: AlertController
  ) {}
  public foto: any = 'https://cdn-icons-png.flaticon.com/512/4128/4128176.png';
  pedidos = null;
  ngOnInit() {
    this.home = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPedidos();
  }
  public estados = null;

  ionViewWillEnter() {
    this.getPedidos();
  }

  getPedidos() {
    this.pedidoService.get().subscribe((data) => {
      console.log(data);
      this.pedidos = data.pedido;
    });
  }

  async opciones(id, est) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      backdropDismiss: false,
      buttons: [
        //Borrar pedido
        {
          text: 'Borrar Pedido',
          role: 'destructive',
          icon: 'trash',
          id: 'delete-button',
          data: {
            type: 'delete',
          },
          handler: async () => {
            const alert = await this.alertController.create({
              header: 'Eliminar Pedido',
              message: '¿Está seguro de querer eliminar el pedido?',
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  id: 'cancel-button',
                },
                {
                  text: 'Eliminar',
                  id: 'confirm-button',
                  handler: () => {
                    this.pedidoService.delete(id).subscribe(async (data) => {
                      const message = data['success']
                        ? 'Pedido #' + id + ' borrado con exito'
                        : ' Error al eliminar, el registro esta siendo utilizado';
                      const toast = await this.toastCtrl.create({
                        message: 'Pedido #' + id + ' borrado con exito',
                        duration: 2000,
                      });
                      toast.present();
                      this.getPedidos();
                    });
                  },
                },
              ],
            });

            await alert.present();
          },
        },

        //Cambiar estado

        {
          text: 'Cambiar Estado',
          icon: 'pricetag',
          data: est,
          handler: () => {
            console.log('Estado cambiado');
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  private obtenerEstados() {
    this.estadoService.listEstados().subscribe((data) => {
      this.estados = data.success ? data.estados : null;
    });
  }
}
