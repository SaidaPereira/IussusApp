import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ToastController } from '@ionic/angular';
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

  borrarEstado(codigo) {
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
