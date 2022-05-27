import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Platform, ToastController } from '@ionic/angular';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem} from '@capacitor/filesystem';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  public foto: any ='https://cdn-icons-png.flaticon.com/512/4128/4128176.png';
 
  private usu_img : String;
  
  private codigo;
  
  
    registrousuario = this.fb.group({
    email: ['', Validators.required],
    nombre: ['', Validators.required],
    telefono: [''],
    imagen : ['']
  });


  constructor(
    private sanitizer: DomSanitizer,
    private activateRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private toastCtrl: ToastController,
    private fb: FormBuilder,
    private router: Router,
    private platform: Platform,
    private storage :Storage,
  ) { }

  ngOnInit() {
    this. listarUsuario() ;
  }

  guardarUsuario(){ 
    const usuario = this.registrousuario.value;
    const usuarios = {
      usu_codigo: this.codigo === '0' ? null : Number(this.codigo),
      usu_email: usuario.email,
      usu_name: usuario.nombre,
      usu_telefono: usuario.telefono,
      usu_img : this.usu_img
    };
    console.log('DATA', usuarios);

    this.usuarioService.create(usuarios).subscribe(async (data: any) => {
      const message = data.success
        ? 'Dato Guardado con exito'
        : ' Error al guardar';
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
      });

      toast.present();

    });
  }


  logout(){
    this.usuarioService.logout();
  }


  async listarUsuario() {
    this.storage.create();

    this.codigo = await this.storage.get("codigo");

    if (this.codigo !== '0') {
      this.usuarioService.getById(this.codigo).subscribe((data) => {
        if (data.success) {
          this.registrousuario.setValue({
           email: data.usuario.usu_email,
            nombre: data.usuario.usu_name,
            imagen: data.usuario.usu_img,
            telefono: data.usuario.usu_telefono,
          });
          this.foto = data.usuario.usu_img;
          console.log(data);
        }
      });
    }
  }

  async getPicture() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos // Camera, Photos or Prompt!
    });
    this.foto = image.webPath;
    //this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    console.log('image:',image);
    if (image) {
        //this.saveImage(image);
        const base64Data = await this.readAsBase64(image);
        this.usu_img= base64Data;
    }

  }


  private async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

      //imagen
  extraerBase64 = async ($event: any) =>
  new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result,
        });
      };
      reader.onerror = (error) => {
        resolve({
          base: null,
        });
      };
    } catch (e) {
      return null;
    }
  });
}
function usu_codigo(arg0: string, usu_codigo: any) {
  throw new Error('Function not implemented.');
}

