import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrocliente',
  templateUrl: './registrocliente.page.html',
  styleUrls: ['./registrocliente.page.scss'],
})
export class RegistroclientePage implements OnInit {
  public registroCliente : FormGroup;

  constructor(
    private formBuilder : FormBuilder
  ) {
    this.registroCliente = this.formBuilder.group({
      nombre : ['', Validators.required],
      apellido : ['', Validators.required],
      direccion : ['', Validators.required],
      
    })
   }

  ngOnInit() {
  }


  logForm() {

  }
}
