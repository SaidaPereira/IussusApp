import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {


  private URL = "http://localhost:3000";


constructor(private http: HttpClient) { }



public listEstados(): Observable<any> {
  return this.http.get(this.URL + '/estados');
}

public getById(codigo: string): Observable<any> {
  return this.http.get(this.URL + `/estado/find/` + codigo);
}

public Filter(texto: String) {
  return this.http.get(this.URL + `/estados-filter?q=${texto}`);
}

public create(estado) {
  return this.http.post(this.URL + `/estado/create`, estado);
}


public delete(codigo: String) {
  return this.http.delete(this.URL + `/estado/remove/${codigo}`);
}

}
