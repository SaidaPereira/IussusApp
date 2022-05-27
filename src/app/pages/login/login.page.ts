import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UiserviceService } from '../../../services/uiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private codigo;
  loginUser = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
   
  });

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    public router: Router,
    private uiService: UiserviceService,
    private storage : Storage
  ) { }

  ngOnInit() {
  }


  async obtenerLogin( ){
    this.storage.create();

    const valido = await this.usuarioService.login(this.loginUser.value.email,this.loginUser.value.password);

    if(valido){
      //navegar a pantalla principal
      this.router.navigate(['/home']);
      
    }else{
      // alerta
      this.uiService.alertaInformativa('Datos de usuario o contraseña incorrectos');
    }

  }

  



}
