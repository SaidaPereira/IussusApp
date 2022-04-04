import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-registrocliente',
  templateUrl: './registrocliente.page.html',
  styleUrls: ['./registrocliente.page.scss'],
})
export class RegistroclientePage implements OnInit {
  public registrocliente : FormGroup;

  constructor( private formBuilder : FormBuilder,private clienteService : ClienteService) { }

  ngOnInit() {
    this.registrocliente = this.formBuilder.group({
      nombre : ['', Validators.required],
      apellido : ['', Validators.required],
      direccion : ['', Validators.required],
      ruci: [''],
      telefono :[''],
      correo : [],
      notas : [' ']
    });
  }

  public enviardata(){
    this.clienteService.Create({
      nombre : this.registrocliente.value.nombre,
      apellido : this.registrocliente.value.apellido,
      direccion : this.registrocliente.value.direccion,
      ruci:this.registrocliente.value.ruci,
      telefono :this.registrocliente.value.telefono,
      correo : this.registrocliente.value.correo,
      notas: this.registrocliente.value.notas
    }).subscribe(respuesta=>{
      console.log('datos',respuesta);
    });


  }
  
}
