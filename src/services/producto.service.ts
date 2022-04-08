import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private URL = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  
  constructor(private http: HttpClient) { }
  
  
  public list(): Observable<any>{
    return this.http.get(this.URL+'/productos');
  }
  
  public Filter(texto:String){
    return this.http.get(this.URL+`/productos-filter?q=${texto}`);
    
  }
  
  public getById(codigo: string): Observable<any> {
    return this.http.get(this.URL + `/producto/find/` + codigo);
  }
  
  
  public create(producto:any){
    if(producto.pro_codigo){
      return this.http.put(this.URL+`/producto/update`,producto);
    }else{
   
      return this.http.post(this.URL+`/producto/create`,producto);
    }
  }
  
  
  public delete(codigo:String){
    return this.http.delete(this.URL+`/producto/remove/${codigo}`);
    
  }

}
