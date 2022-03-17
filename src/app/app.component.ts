import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
   
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Agenda', url: '/agenda', icon: 'calendar' },
    { title: 'Clientes', url: '/clientes', icon: 'people' },
    { title: 'Productos', url: '/productos', icon: 'cart' },
    { title: 'Registro', url: '/registrousuario', icon: 'person-add' }
 
  

  ];
  
  
  constructor() {}

  
}
