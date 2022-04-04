import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

private URL = "http://localhost:3000";


constructor(private http: HttpClient) { }

/* getClientes(){
  return this.http.get(`${this.URL}/clientes`);
}

getClientesFilter(){
  return this.http.get(`${this.URL}/clientes-filter`);
} */

getClientes(): Observable<any>{
  return this.http.get(this.URL+'/clientes');
}

  
}
