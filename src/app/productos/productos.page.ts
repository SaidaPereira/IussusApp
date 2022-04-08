import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ToastController } from '@ionic/angular';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  @ViewChild(IonList) ionList: IonList;
  product = [];

  constructor(
    private productoService: ProductoService,
    private toastCtrl: ToastController,
    public router: Router
  ) {}

  ngOnInit() {
    this.listarProductos();
  }

  ionViewWillEnter() {
    this.listarProductos();
  }

  listarProductos() {
    this.productoService.list().subscribe((data) => {
      if (data.success) {
        this.product = data.productos;
      } else {
        this.product = [];
      }
    });
  }

  buscar(event) {
    const valor = event.detail.value;

    this.productoService.Filter(valor).subscribe((data) => {
      console.log(data);
      if (data) {
        this.product = data['productos'];
      } else {
        this.product = [];
      }
    });
  }

  borrarProducto(codigo) {
    this.productoService.delete(codigo).subscribe(async (data) => {
      const message = data['success']
        ? 'Producto #' + codigo + ' borrado con exito'
        : ' Error al eliminar';
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
      });
      this.listarProductos();

      toast.present();

      this.ionList.closeSlidingItems();
    });
  }

  editar(codigo) {
    const valor = this.productoService.getById(codigo).subscribe((data) => {
      console.log(valor);
    });

   
  }
}
