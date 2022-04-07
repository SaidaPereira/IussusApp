import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ToastController } from '@ionic/angular';
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
    public router: Router
  ) {}

  ngOnInit() {
    this.listar();
  }

  ionViewWillEnter(){
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

  borrarcliente(codigo) {
    this.clienteService.delete(codigo).subscribe(async (data) => {
      const message = data['success']
        ? 'Cliente #' + codigo + ' borrado con exito'
        : ' Error al eliminar';
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
      });
      this.listar();

      toast.present();

      this.ionList.closeSlidingItems();
    });
  }

  editar(codigo) {
    const valor = this.clienteService.getById(codigo).subscribe((data) => {
      console.log(valor);
    
    });

    this.clienteService.create(valor) ;
  }
}
