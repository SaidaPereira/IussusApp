import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
   
    { title: 'Agenda', url: '/agenda', icon: 'calendar' },
    { title: 'Clientes', url: '/clientes', icon: 'people' },
    { title: 'Pedidos', url: '/pedidos', icon: 'clipboard' },
    { title: 'Productos', url: '/productos', icon: 'cart' },
    { title: 'Registro', url: '/registro', icon: 'person-add' }
 
  

  ];
  
  
  constructor() {}

  
}
