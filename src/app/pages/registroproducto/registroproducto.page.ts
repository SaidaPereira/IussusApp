import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registroproducto',
  templateUrl: './registroproducto.page.html',
  styleUrls: ['./registroproducto.page.scss'],
})
export class RegistroproductoPage implements OnInit {
  private codigo;

  registroproducto = this.fb.group({
    descripcion: ['', Validators.required],
    costo: [''],
    precio: [' '],
    unimed: [' '],
    obse: [''],
  });

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    public router: Router,
    private toastCtrl: ToastController,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.listarProducto();
  }

  guardarProducto() {
    const producto = this.registroproducto.value;
    const productos = {
      pro_codigo: this.codigo === '0' ? null : Number(this.codigo),
      pro_descripcion: producto.descripcion,
      pro_costo: producto.costo,
      pro_precio: producto.precio,
      pro_unimed: producto.unimed,
      pro_obse: producto.obse,
    };
    console.log('Productos', productos);

    this.productoService.create(productos).subscribe(async (data: any) => {
      const message = data['success']
        ? 'Producto Guardado con exito'
        : ' Error al guardar';
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
      });

      toast.present();

      this.router.navigate(['/productos']);
    });
  }

  listarProducto() {
    this.codigo = this.activateRoute.snapshot.params.id;

    if (this.codigo !== '0') {
      this.productoService.getById(this.codigo).subscribe((data) => {
        if (data.success) {
          this.registroproducto.setValue({
            descripcion: data.producto.pro_descripcion,
            costo: data.producto.pro_costo,
            precio: data.producto.pro_precio,
            unimed: data.producto.pro_unimed,
            obse: data.producto.pro_obse,
          });
          console.log(data);
        }
      });
    }
  }
}
