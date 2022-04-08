import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrocliente',
  templateUrl: './registrocliente.page.html',
  styleUrls: ['./registrocliente.page.scss'],
})
export class RegistroclientePage implements OnInit {
  private codigo;

  registrocliente = this.fb.group({
    nombre: ['', Validators.required],
    apellido: [''],
    direccion: [''],
    ruci: [''],
    telefono: ['', Validators.required],
    correo: [],
    notas: [' '],
  });

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    public router: Router,
    private toastCtrl: ToastController,
    public loading: LoadingController,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.listarCliente();
  }

  guardarCliente() {
    const cliente = this.registrocliente.value;
    const clientes = {
      cli_codigo: this.codigo === '0' ? null : Number(this.codigo),
      cli_nombre: cliente.nombre,
      cli_apellido: cliente.apellido,
      cli_direccion: cliente.direccion,
      cli_ruci: cliente.ruci,
      cli_telefono: cliente.telefono,
      cli_correo: cliente.correo,
      cli_notas: cliente.notas,
    };
    console.log('DATA CLIENTE', clientes);

    this.clienteService.create(clientes).subscribe(async (data: any) => {
      const message = data['success']
        ? 'Cliente Guardado con exito'
        : ' Error al guardar';
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
      });

      toast.present();

      this.router.navigate(['/clientes']);
    });
  }

  listarCliente() {
    this.codigo = this.activateRoute.snapshot.params.id;

    if (this.codigo !== '0') {
      this.clienteService.getById(this.codigo).subscribe((data) => {
        if (data.success) {
          this.registrocliente.setValue({
            nombre: data.cliente.cli_nombre,
            apellido: data.cliente.cli_apellido,
            direccion: data.cliente.cli_direccion,
            ruci: data.cliente.cli_ruci,
            telefono: data.cliente.cli_telefono,
            correo: data.cliente.cli_correo,
            notas: data.cliente.cli_notas,
          });
          console.log(data);
        }
      });
    }
  }
}
