import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private URL = "http://localhost:3000";
constructor(private http: HttpClient) { }

cabecer;

public getById(codigo: string): Observable<any> {
  return this.http.get(this.URL + `/pedido/find/` + codigo);
}

public get(): Observable<any> {
  return this.http.get(this.URL + `/pedido/get`);
}


public create(pedido:any){
 
    return this.http.post(this.URL+`/pedido/create`,pedido);
  
}

public delete(codigo: String) {
  return this.http.delete(this.URL + `/pedido/remove/${codigo}`);
}

public updateEstado(ped_codigo:String, ped_codest:String){
  const pedido = {ped_codigo,ped_codest};
 
    return this.http.put(this.URL+`/pedido/update`,pedido);
  
}

}
