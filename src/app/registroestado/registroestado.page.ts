import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/estado.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registroestado',
  templateUrl: './registroestado.page.html',
  styleUrls: ['./registroestado.page.scss'],
})
export class RegistroestadoPage implements OnInit {

  registroestado= this.fb.group({
    descripcion: ['', Validators.required]
  });

  constructor(
    private fb : FormBuilder,
    private estadoService : EstadoService,
    public router: Router,
    private toastCtrl: ToastController,
   ) {}

  ngOnInit() {
 
  }
 
    guardarEstado() {
      const estado = {
      est_codigo: this.registroestado.value.codigo ==='0' ? null : Number(this.registroestado.value.codigo), 
      est_descripcion : this.registroestado.value.descripcion
      }
      console.log('Estadoos', estado);

      this.estadoService.create(estado).subscribe(async (data : any ) => {
        const message = data['success']
        ? 'Estado Guardado con exito'
        : ' Error al guardar';
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
      });
      

      toast.present();
    
        this.router.navigate(['/estados']);
      })
    }


}



