import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import axios from 'axios';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
 
 
  @ViewChild(IonList) ionList: IonList;
  client = [];
 
  constructor(private clienteService : ClienteService) { }
  
  ngOnInit(){
    this.clienteService.getClientes().subscribe(data=>{
      if(data.success){
        this.client = data.clientes;

      }else{
        this.client = [];
      }
    });
  }


  editar(respuesta: any){
    console.log("Editado",respuesta);
    this.ionList.closeSlidingItems();

  }

  eliminar(respuesta: any){
    console.log("Eliminado", respuesta);
    this.ionList.closeSlidingItems();
  }
}
