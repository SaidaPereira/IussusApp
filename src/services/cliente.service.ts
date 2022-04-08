import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Cliente } from '../app/interfaces/cliente';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

private URL = "http://localhost:3000";

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


constructor(private http: HttpClient) { }


public list(): Observable<any>{
  return this.http.get(this.URL+'/clientes');
}

public Filter(texto:String){
  return this.http.get(this.URL+`/clientes-filter?q=${texto}`);
  
}

public getById(codigo: string): Observable<any> {
  return this.http.get(this.URL + `/cliente/find/` + codigo);
}


public create(cliente:any){
  if(cliente.cli_codigo){
    //Actualiza los datos
    return this.http.put(this.URL+`/cliente/update`,cliente);
  }else{
  // Crea Registro nuevo
    return this.http.post(this.URL+`/cliente/create`,cliente);
  }
}


public delete(codigo:String){
  return this.http.delete(this.URL+`/cliente/remove/${codigo}`);
  
}
}