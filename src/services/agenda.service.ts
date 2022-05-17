import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

private URL = "http://localhost:3000";


constructor(private http: HttpClient) { }



public listAgenda(): Observable<any> {
  return this.http.get(this.URL + '/agendas');
}

public getById(codigo: string): Observable<any> {
  return this.http.get(this.URL + `/agenda/find/` + codigo);
}


public create(agenda:any){
  if(agenda.age_codigo){
    return this.http.put(this.URL+`/agenda/update`,agenda);
  }else{
 
    return this.http.post(this.URL+`/agenda/create`,agenda);
  }
}

public delete(codigo: String) {
  return this.http.delete(this.URL + `/agenda/remove/${codigo}`);
}

}
