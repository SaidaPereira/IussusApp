import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../interfaces/cliente';
import { async } from '@angular/core/testing';
import { loadingController } from '@ionic/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrocliente',
  templateUrl: './registrocliente.page.html',
  styleUrls: ['./registrocliente.page.scss'],
})
export class RegistroclientePage implements OnInit {
  


  registrocliente= this.fb.group({
    nombre : ['', Validators.required],
    apellido : [''],
    direccion : [''],
    ruci: [''],
    telefono :['', Validators.required],
    correo : [],
    notas : [' ']
  });

  constructor(
    private fb : FormBuilder,
    private clienteService : ClienteService,
    public router: Router,
    private toastCtrl: ToastController,
    public loading: LoadingController) {}

  ngOnInit() {
 
  }
 
    guardarCliente() {
      const Cliente = {
       cli_codigo: this.registrocliente.value.codigo ==='0' ? null : Number(this.registrocliente.value.codigo), 
      cli_nombre : this.registrocliente.value.nombre,
      cli_apellido : this.registrocliente.value.apellido,
      cli_direccion : this.registrocliente.value.direccion,
      cli_ruci:this.registrocliente.value.ruci,
      cli_telefono :this.registrocliente.value.telefono,
      cli_correo : this.registrocliente.value.correo,
      cli_notas: this.registrocliente.value.notas
      }
      console.log('DATA CLIENTEEEE', Cliente);

      this.clienteService.create(Cliente).subscribe(async (data : any ) => {
        const message = data['success']
        ? 'Cliente Guardado con exito'
        : ' Error al guardar';
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
      });
      

      toast.present();
    
        this.router.navigate(['/clientes']);
      })
    }


}