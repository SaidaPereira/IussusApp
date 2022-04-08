import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registroproducto',
  templateUrl: './registroproducto.page.html',
  styleUrls: ['./registroproducto.page.scss'],
})
export class RegistroproductoPage implements OnInit {

  registroproducto= this.fb.group({
    descripcion: ['', Validators.required],
    costo :  [''],
    precio : [' '],
    unimed: [' '],
    obse:['']
  });

  constructor(
    private fb : FormBuilder,
    private productoService : ProductoService,
    public router: Router,
    private toastCtrl: ToastController,
   ) {}

  ngOnInit() {
 
  }
 
    guardarProducto() {
      const producto = {
      pro_codigo: this.registroproducto.value.codigo ==='0' ? null : Number(this.registroproducto.value.codigo), 
      pro_descripcion : this.registroproducto.value.descripcion,
      pro_costo : this.registroproducto.value.costo,
      pro_precio : this.registroproducto.value.precio,
      pro_unimed : this.registroproducto.value.unimed,
      pro_obse : this.registroproducto.value.obse
      }
      console.log('Productoo', producto);

      this.productoService.create(producto).subscribe(async (data : any ) => {
        const message = data['success']
        ? 'Producto Guardado con exito'
        : ' Error al guardar';
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
      });
      

      toast.present();
    
        this.router.navigate(['/productos']);
      })
    }


}
