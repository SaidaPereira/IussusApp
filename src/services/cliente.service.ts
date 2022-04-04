import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

private URL = "http://localhost:3000";


constructor(private http: HttpClient) { }


public list(): Observable<any>{
  return this.http.get(this.URL+'/clientes');
}

public Filter(texto:String){
  return this.http.get(this.URL+`/clientes-filter?q=${texto}`);
  
}


public Create(data:any): Observable<any>{
 
  return this.http.post(`${this.URL}/cliente/create`,data);
}
}