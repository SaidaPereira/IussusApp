import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { EstadoService } from 'src/services/estado.service';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.page.html',
  styleUrls: ['./estados.page.scss'],
})
export class EstadosPage implements OnInit {

  @ViewChild(IonList) ionList: IonList;
  estad = [];
 
  constructor(private estadoService : EstadoService) { }
  
  ngOnInit(){
    this.estadoService.listEstados().subscribe(data=>{
      if(data.success){
        this.estad = data.estados;

      }else{
        this.estad= [];
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
