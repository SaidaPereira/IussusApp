import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: String = null;
  codigo:String = null;
  
  private URL = "http://localhost:3000";


constructor(private http: HttpClient, private storage : Storage, public router: Router) { }

public getById(codigo: string): Observable<any> {
  return this.http.get(this.URL + `/usuario/find/` + codigo);
}


public create(usuario:any){
  if(usuario.usu_codigo){
    //Actualiza los datos
    return this.http.put(this.URL+`/usuario/update`,usuario);
  }else{
  // Crea Registro nuevo
    return this.http.post(this.URL+`/usuario/create`,usuario);
  }
}


public delete(codigo:String){
  return this.http.delete(this.URL+`/usuario/remove/${codigo}`);
  
}


public login(usu_email:String, usu_password:String){
  const data = {usu_email, usu_password};

  return new Promise(resolve=>{

    this.http.post(this.URL+`/usuario/login`,data).subscribe(resp=>{
      console.log(resp);
   
  
     if(resp['success']){
       this.guardarToken(resp['token']);
       this.guardarId(resp['codigo']);
       resolve(true);
  
     }else{
       this.token=null;
       this.codigo=null;
       this.storage.clear();
       resolve(false);
     }
  
    });




  });


  }

async guardarToken(usu_token:String){
  this.storage.create();
this.token = usu_token;
await this.storage.set('token',usu_token);
}

async guardarId(usu_codigo:String){
  this.storage.create();
this.codigo = usu_codigo;
await this.storage.set('codigo',usu_codigo);
}

  logout(){
    this.storage.create();
    this.token = null;
    this.storage.clear();
    this.router.navigate(['/login']);
    

    
  }
}



