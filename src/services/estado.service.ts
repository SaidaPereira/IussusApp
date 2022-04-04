import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {


  private URL = "http://localhost:3000";


constructor(private http: HttpClient) { }

listEstados(): Observable<any>{
  return this.http.get(this.URL+'/estados');
}


}
