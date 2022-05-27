import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrousuario',
  templateUrl: './registrousuario.page.html',
  styleUrls: ['./registrousuario.page.scss'],
})
export class RegistrousuarioPage implements OnInit {
  
  
  
    registrousuario = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    nombre: ['', Validators.required],
    telefono: [''],
  });
  private codigo;



  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    public router: Router,
    private toastCtrl: ToastController,
    private activateRoute: ActivatedRoute,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.listarUsuario();
  }


  async guardarUsuario() {

    
    const usuario = this.registrousuario.value;

    if (usuario.password !== usuario.password2) {
      const alert = await this.alertController.create({
        message: 'Las Contraseñas no coinciden'
      });
      alert.present();
      return;
    }


    const usuarios = {
      usu_codigo: this.codigo === '0' ? null : Number(this.codigo),
      usu_email: usuario.email,
      usu_password: usuario.password, 
      usu_name: usuario.nombre,
      usu_telefono: usuario.telefono,
    };
    console.log('Usuario creado correctamente');

    this.usuarioService.create(usuarios).subscribe(async (data: any) => {
      const message = data.success
        ? 'Usuario Guardado con exito'
        : ' Error al guardar';
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
      });

      toast.present();

      this.router.navigate(['/login']);
    });
  }

  listarUsuario() {
    this.codigo = this.activateRoute.snapshot.params.id;

    if (this.codigo !== '0') {
      this.usuarioService.getById(this.codigo).subscribe((data) => {
        if (data.success) {
          this.registrousuario.setValue({
           email: data.usuario.usu_email,
           password: data.usuario.usu_password,
            nombre: data.usuario.usu_name,
            
            telefono: data.usuario.usu_telefono,
          });
          console.log(data);
        }
      });
    }
  }
}
