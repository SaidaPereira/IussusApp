import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/estado.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registroestado',
  templateUrl: './registroestado.page.html',
  styleUrls: ['./registroestado.page.scss'],
})
export class RegistroestadoPage implements OnInit {
  registroestado = this.fb.group({
    descripcion: ['', Validators.required],
  });

  private codigo;

  constructor(
    private fb: FormBuilder,
    private estadoService: EstadoService,
    public router: Router,
    private toastCtrl: ToastController,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.listarEstado();
  }

  guardarEstado() {
    const estado = this.registroestado.value;
    const estados = {
      est_codigo: this.codigo === '0' ? null : Number(this.codigo),
      est_descripcion: estado.descripcion,
    };
    console.log('Estadoos', estados);

    this.estadoService.create(estados).subscribe(async (data: any) => {
      const message = data.success
        ? 'Estado Guardado con exito'
        : ' Error al guardar';
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
      });

      toast.present();

      this.router.navigate(['/estados']);
    });
  }

  listarEstado() {
    this.codigo = this.activateRoute.snapshot.params.id;

    if (this.codigo !== '0') {
      this.estadoService.getById(this.codigo).subscribe((data) => {
        if (data.success) {
          this.registroestado.setValue({
            descripcion: data.estado.est_descripcion,
          });
          console.log(data);
        }
      });
    }
  }
}
